import { LuMail, LuMailOpen } from "react-icons/lu";
import type { EmailMessage } from "../../../store/api/mailboxApi";

interface MessageRowProps {
  message: EmailMessage;
  onClick?: (message: EmailMessage) => void;
}

const MessageRow = ({ message, onClick }: MessageRowProps) => {
  const senderName = message.from.includes("<")
    ? message.from.split("<")[0].trim()
    : message.from;

  const preview = message.text?.replace(/\s+/g, " ").trim() || "";

  const time = new Date(message.receivedAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <button
      onClick={() => onClick?.(message)}
      className={`flex w-full items-start gap-4 border-b px-5 py-4 text-left transition-colors hover:bg-gray-50 ${
        !message.is_read ? "bg-blue-50/40" : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          !message.is_read
            ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {!message.is_read ? <LuMail size={17} /> : <LuMailOpen size={17} />}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p
            className={`truncate text-sm ${
              !message.is_read
                ? "font-semibold text-gray-900"
                : "font-medium text-gray-700"
            }`}
          >
            {senderName}
          </p>

          <span className="shrink-0 text-xs text-gray-400">{time}</span>
        </div>

        <p
          className={`mt-0.5 truncate text-sm ${
            !message.is_read ? "font-medium text-gray-900" : "text-gray-700"
          }`}
        >
          {message.subject || "(No subject)"}
        </p>

        <p className="mt-1 truncate text-xs text-gray-500">{preview}</p>
      </div>

      {/* Unread indicator */}
      {!message.is_read && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
      )}
    </button>
  );
};

export default MessageRow;
