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

const ITEMS_PER_PAGE = 10;

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
   * Join mailbox room: on mount AND on every (re)connect.
   * Rooms are server-side, so a new socket id after a reconnect
   * means we're in no rooms until we join again.
   */
  useEffect(() => {
    if (!mailboxId) return;

    const join = () => socket.emit("join_mailbox", mailboxId);

    if (socket.connected) join();

    socket.on("connect", join);

    // catch up on mails that arrived while disconnected
    const handleReconnect = () => refetch();
    socket.io.on("reconnect", handleReconnect);

    return () => {
      socket.off("connect", join);
      socket.io.off("reconnect", handleReconnect);
      socket.emit("leave_mailbox", mailboxId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailboxId]);

  /*
   * Event listeners: safe to re-bind when the page changes.
   */
  useEffect(() => {
    if (!mailboxId) return;

    const handleNewMessage = (message: EmailMessage) => {
      if (currentPage !== 1) return;

      dispatch(
        mailBoxApi.util.updateQueryData("getMyMessages", { mailboxId, page: 1, limit: ITEMS_PER_PAGE }, (draft) => {
          if (!Array.isArray(draft.messages)) return;
          if (draft.messages.some((m) => m.id === message.id)) return;

          draft.messages.unshift(message);
          draft.pagination.total += 1;
          draft.pagination.totalPages = Math.ceil(draft.pagination.total / draft.pagination.limit);

          if (draft.messages.length > draft.pagination.limit) draft.messages.pop();
        }),
      );
    };

    const handleMessageRead = ({ messageId }: { messageId: string }) => {
      dispatch(
        mailBoxApi.util.updateQueryData("getMyMessages", { mailboxId, page: currentPage, limit: ITEMS_PER_PAGE }, (draft) => {
          const message = draft.messages.find((m) => m.id === messageId);
          if (message) message.is_read = true;
        }),
      );
    };

    socket.on("new_message", handleNewMessage);
    socket.on("message_read", handleMessageRead);

    return () => {
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
// import { useEffect, useState } from "react";
// import { LuInbox, LuRefreshCw } from "react-icons/lu";

// import EmptyInbox from "../components/empty-inbox";
// import MessageRow from "../components/message-row";
// import Modal from "../../../components/ui/model";
// import MessageDetails from "../components/message-detail";
// import Pagination from "../components/pagination";

// import { useGetMyMessagesQuery, useMarkMessageAsReadMutation } from "../../../store/api/mailboxApi";

// import type { EmailMessage } from "../../../store/types/mailbox";

// interface InboxProps {
//   mailboxId: string;
// }

// const ITEMS_PER_PAGE = 20;

// const Inbox = ({ mailboxId }: InboxProps) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [mailboxId]);

//   const { data, isLoading, isFetching, refetch } = useGetMyMessagesQuery(
//     { mailboxId, page: currentPage, limit: ITEMS_PER_PAGE },
//     {
//       skip: !mailboxId,
//       pollingInterval: 5000,
//       skipPollingIfUnfocused: true,
//       refetchOnFocus: true, // instant catch-up when the tab regains focus (needs setupListeners(store.dispatch))
//     },
//   );

//   const messages = Array.isArray(data?.messages) ? data.messages : [];
//   const pagination = data?.pagination;

//   const [markAsRead] = useMarkMessageAsReadMutation();

//   const unreadCount = messages.filter((m) => !m.is_read).length;

//   const handleMessageClick = (message: EmailMessage) => {
//     setSelectedMessage(message);

//     if (!message.is_read) {
//       markAsRead({ mailboxId, messageId: message.id, page: currentPage, limit: ITEMS_PER_PAGE });
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setSelectedMessage(null);
//   };

//   return (
//     <>
//       <div className="mx-auto my-4 flex h-125 w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
//         <div className="flex items-center justify-between border-b px-5 py-4">
//           <div className="flex items-center gap-2">
//             <LuInbox size={20} className="text-gray-700" />
//             <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
//             {unreadCount > 0 && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{unreadCount} unread</span>}
//           </div>

//           <button
//             onClick={() => refetch()}
//             disabled={isFetching}
//             className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             <LuRefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
//             Refresh
//           </button>
//         </div>

//         <div className="min-h-0 flex-1 overflow-y-auto scrollbar-custom">
//           {isLoading ? (
//             <div className="flex h-full items-center justify-center text-sm text-gray-500">Loading messages...</div>
//           ) : messages.length > 0 ? (
//             messages.map((message) => <MessageRow key={message.id} message={message} onClick={handleMessageClick} />)
//           ) : (
//             <EmptyInbox />
//           )}
//         </div>
//       </div>

//       {pagination && pagination.total > 0 && <Pagination currentPage={pagination.page} totalItems={pagination.total} itemsPerPage={pagination.limit} onPageChange={handlePageChange} />}

//       <Modal open={selectedMessage !== null} onClose={() => setSelectedMessage(null)} className="h-[calc(100vh-2rem)] max-w-3xl sm:h-[calc(100vh-4rem)]">
//         {selectedMessage && <MessageDetails message={selectedMessage} />}
//       </Modal>
//     </>
//   );
// };

// export default Inbox;
