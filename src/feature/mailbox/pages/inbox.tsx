import { useEffect, useState } from "react";
import { LuInbox, LuRefreshCw } from "react-icons/lu";
import EmptyInbox from "../components/empty-inbox";
import MessageRow from "../components/message-row";
import Modal from "../../../components/ui/model";
import MessageDetails from "../components/message-detail";
import { socket } from "../../../socket/socket";
import { useAppDispatch } from "../../../hooks/redux";
import {
  mailBoxApi,
  useGetMyMessagesQuery,
  useMarkMessageAsReadMutation,
  type EmailMessage,
} from "../../../store/api/mailboxApi";
interface InboxProps {
  mailboxId: string;
}

const Inbox = ({ mailboxId }: InboxProps) => {
  const dispatch = useAppDispatch();
  const {
    data: messages = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetMyMessagesQuery(mailboxId, { skip: !mailboxId });
  const [markAsRead] = useMarkMessageAsReadMutation();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(
    null,
  );
  useEffect(() => {
    socket.on("connect", () => console.log("SOCKET CONNECTED, id:", socket.id));
    socket.on("connect_error", (err) =>
      console.log("SOCKET CONNECT ERROR:", err.message),
    );
    socket.on("disconnect", (reason) =>
      console.log("SOCKET DISCONNECTED:", reason),
    );

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);
  // useEffect(() => {
  //   if (!mailboxId) return;

  //   console.log(
  //     "joining room for mailboxId:",
  //     mailboxId,
  //     "connected:",
  //     socket.connected,
  //   );
  //   socket.emit("join_mailbox", mailboxId);

  //   const handleNewMessage = (message: EmailMessage) => {
  //     console.log("SOCKET EVENT RECEIVED:", message);
  //     dispatch(
  //       mailBoxApi.util.updateQueryData("getMyMessages", mailboxId, (draft) => {
  //         draft.unshift(message);
  //       }),
  //     );
  //   };

  //   socket.on("new_message", handleNewMessage);

  //   return () => {
  //     socket.emit("leave_mailbox", mailboxId);
  //     socket.off("new_message", handleNewMessage);
  //   };
  // }, [mailboxId, dispatch]);
  useEffect(() => {
    if (!mailboxId) return;

    // console.log(
    //   "joining room for mailboxId:",
    //   mailboxId,
    //   "connected:",
    //   socket.connected,
    // );
    socket.emit("join_mailbox", mailboxId);

    const handleNewMessage = (message: EmailMessage) => {
      console.log("SOCKET EVENT RECEIVED:", message);
      dispatch(
        mailBoxApi.util.updateQueryData("getMyMessages", mailboxId, (draft) => {
          draft.unshift(message);
        }),
      );
    };

    const handleMessageRead = ({ messageId }: { messageId: string }) => {
      dispatch(
        mailBoxApi.util.updateQueryData("getMyMessages", mailboxId, (draft) => {
          const msg = draft.find((m) => m.id === messageId);
          if (msg) msg.is_read = true;
        }),
      );
    };

    socket.on("new_message", handleNewMessage);
    socket.on("message_read", handleMessageRead);

    return () => {
      socket.emit("leave_mailbox", mailboxId);
      socket.off("new_message", handleNewMessage);
      socket.off("message_read", handleMessageRead);
    };
  }, [mailboxId, dispatch]);
  const unreadCount = messages.filter((message) => !message.is_read).length;

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };
  const handleMessageClick = (message: EmailMessage) => {
    setSelectedMessage(message);

    if (!message.is_read) {
      markAsRead({ mailboxId, messageId: message.id });
    }
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };
  return (
    <div className="mx-auto my-6 flex h-125 w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <LuInbox size={20} className="text-gray-700" />

          <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>

          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {unreadCount} unread
            </span>
          )}
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
        {messages.length > 0 || isLoading ? (
          messages?.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              onClick={handleMessageClick}
            />
          ))
        ) : (
          <EmptyInbox />
        )}
        {/* {dummyMessages.length > 0 ? (
          dummyMessages.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              onClick={handleMessageClick}
            />
          ))
        ) : (
          <EmptyInbox />
        )} */}
      </div>
      <Modal
        open={selectedMessage !== null}
        onClose={handleCloseMessage}
        className="h-[calc(100vh-2rem)] max-w-3xl sm:h-[calc(100vh-4rem)]"
      >
        {selectedMessage && <MessageDetails message={selectedMessage} />}
      </Modal>
    </div>
  );
};

export default Inbox;
