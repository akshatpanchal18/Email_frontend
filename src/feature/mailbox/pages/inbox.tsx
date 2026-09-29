import { useEffect, useState } from "react";
import { LuInbox, LuRefreshCw } from "react-icons/lu";

import EmptyInbox from "../components/empty-inbox";
import MessageRow from "../components/message-row";
import Modal from "../../../components/ui/model";
import MessageDetails from "../components/message-detail";
import Pagination from "../components/pagination";

import { socket } from "../../../socket/socket";
import { useAppDispatch } from "../../../hooks/redux";

import { mailBoxApi, useGetMyMessagesQuery, useMarkMessageAsReadMutation } from "../../../store/api/mailboxApi";

import type { EmailMessage } from "../../../store/types/mailbox";

interface InboxProps {
  mailboxId: string;
}

const ITEMS_PER_PAGE = 20;

const Inbox = ({ mailboxId }: InboxProps) => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

  /*
   * Reset pagination when switching mailboxes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [mailboxId]);

  /*
   * Fetch paginated messages.
   */
  const { data, isLoading, isFetching, refetch } = useGetMyMessagesQuery(
    {
      mailboxId,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    },
    {
      skip: !mailboxId,
    },
  );

  /*
   * Because the API response is now:
   *
   * {
   *   messages: [],
   *   pagination: {}
   * }
   */
  const messages = Array.isArray(data?.messages) ? data.messages : [];
  const pagination = data?.pagination;
  // useEffect(() => {
  //   console.log("RAW_DATA", data);
  //   console.log("MESSAGES", messages);
  //   console.log("PAGE", pagination);
  // }, [data]);

  const [markAsRead] = useMarkMessageAsReadMutation();

  /*
   * Socket connection listeners.
   */
  useEffect(() => {
    const handleConnect = () => {
      console.log("SOCKET CONNECTED, id:", socket.id);
    };

    const handleConnectError = (err: Error) => {
      console.error("SOCKET CONNECT ERROR:", err.message);
    };

    const handleDisconnect = (reason: string) => {
      console.log("SOCKET DISCONNECTED:", reason);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  /*
   * Join mailbox socket room.
   */
  useEffect(() => {
    if (!mailboxId) return;

    socket.emit("join_mailbox", mailboxId);

    /*
     * New email received.
     *
     * We only modify page 1 because new emails are sorted
     * newest-first by the backend.
     *
     * If the user is on another page, don't inject the new
     * message into that page.
     */
    const handleNewMessage = (message: EmailMessage) => {
      if (currentPage !== 1) {
        return;
      }

      dispatch(
        mailBoxApi.util.updateQueryData(
          "getMyMessages",
          {
            mailboxId,
            page: 1,
            limit: ITEMS_PER_PAGE,
          },
          (draft) => {
            if (!Array.isArray(draft.messages)) return;
            if (draft.messages.some((m) => m.id === message.id)) return;

            draft.messages.unshift(message);

            /*
             * Keep the pagination count in sync.
             */
            draft.pagination.total += 1;

            draft.pagination.totalPages = Math.ceil(draft.pagination.total / draft.pagination.limit);

            /*
             * Don't let page 1 grow beyond the requested page size.
             */
            if (draft.messages.length > draft.pagination.limit) {
              draft.messages.pop();
            }
          },
        ),
      );
    };

    /*
     * Message read event.
     */
    const handleMessageRead = ({ messageId }: { messageId: string }) => {
      dispatch(
        mailBoxApi.util.updateQueryData(
          "getMyMessages",
          {
            mailboxId,
            page: currentPage,
            limit: ITEMS_PER_PAGE,
          },
          (draft) => {
            const message = draft.messages.find((message) => message.id === messageId);

            if (message) {
              message.is_read = true;
            }
          },
        ),
      );
    };

    socket.on("new_message", handleNewMessage);
    socket.on("message_read", handleMessageRead);

    return () => {
      socket.emit("leave_mailbox", mailboxId);

      socket.off("new_message", handleNewMessage);
      socket.off("message_read", handleMessageRead);
    };
  }, [mailboxId, currentPage, dispatch]);

  /*
   * This is the unread count for the CURRENT PAGE only.
   *
   * If you want the total unread count across the entire
   * mailbox, the backend should return unreadCount separately.
   */
  const unreadCount = messages.filter((message) => !message.is_read).length;

  /*
   * Refresh current page.
   */
  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  /*
   * Open message and mark it as read.
   */
  const handleMessageClick = (message: EmailMessage) => {
    setSelectedMessage(message);

    if (!message.is_read) {
      markAsRead({
        mailboxId,
        messageId: message.id,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });
    }
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  /*
   * Change page.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedMessage(null);
  };

  return (
    <>
      <div className="mx-auto my-4 flex h-125 w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <LuInbox size={20} className="text-gray-700" />

            <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>

            {unreadCount > 0 && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{unreadCount} unread</span>}
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing || isFetching}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LuRefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Message list */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-custom">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">Loading messages...</div>
          ) : messages.length > 0 ? (
            messages.map((message) => <MessageRow key={message.id} message={message} onClick={handleMessageClick} />)
          ) : (
            <EmptyInbox />
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.total > 0 && <Pagination currentPage={pagination.page} totalItems={pagination.total} itemsPerPage={pagination.limit} onPageChange={handlePageChange} />}

      {/* Message Details */}
      <Modal open={selectedMessage !== null} onClose={handleCloseMessage} className="h-[calc(100vh-2rem)] max-w-3xl sm:h-[calc(100vh-4rem)]">
        {selectedMessage && <MessageDetails message={selectedMessage} />}
      </Modal>
    </>
  );
};

export default Inbox;
