import { LuLoader, LuMail, LuMailOpen, LuTrash2 } from "react-icons/lu";
import type { EmailMessage } from "../../../store/types/mailbox";

interface MessageRowProps {
  message: EmailMessage;
  selected?: boolean;
  onClick?: (message: EmailMessage) => void;
  onSelect?: (messageId: string, selected: boolean) => void;
  onDelete?: (message: EmailMessage) => void;
  disabled?: boolean;
  deleting?: boolean;
}

const MessageRow = ({ message, selected = false, onClick, onSelect, onDelete, disabled = false, deleting = false }: MessageRowProps) => {
  const senderName = message.from.includes("<") ? message.from.split("<")[0].trim() : message.from;

  const preview = message.text?.replace(/\s+/g, " ").trim() || "";

  const time = new Date(message.receivedAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (disabled) return;
    onSelect?.(message.id, event.target.checked);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (disabled) return;
    onDelete?.(message);
  };
  const getExpiryText = (expiresAt: string) => {
    const expiresAtMs = new Date(expiresAt).getTime();
    const remainingMs = expiresAtMs - Date.now();

    if (remainingMs <= 0) {
      return "Expired";
    }

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    const days = Math.floor(remainingMs / day);

    if (days >= 2) {
      return `Auto-deletes in ${days} days`;
    }

    if (days === 1) {
      return "Auto-deletes tomorrow";
    }

    const hours = Math.floor(remainingMs / hour);

    if (hours >= 1) {
      return `Auto-deletes in ${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    const minutes = Math.max(1, Math.floor(remainingMs / minute));

    return `Auto-deletes in ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  };
  const expiryText = getExpiryText(message.expiresAt);
  return (
    <div
      aria-busy={deleting}
      className={`group flex w-full items-start gap-3 border-b px-4 py-3 transition-colors ${
        disabled ? "" : "hover:bg-gray-50"
      } ${selected ? "bg-blue-50/60" : !message.is_read ? "bg-blue-50/40" : ""} ${deleting ? "opacity-50" : disabled ? "opacity-70" : ""}`}
    >
      {/* Checkbox */}
      <div className="flex shrink-0 items-center pt-2">
        <input
          type="checkbox"
          checked={selected}
          disabled={disabled}
          onChange={handleCheckboxChange}
          aria-label={`Select message from ${senderName}`}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>

      {/* Message */}
      <button type="button" onClick={() => onClick?.(message)} disabled={disabled} className="flex min-w-0 flex-1 items-start gap-4 text-left">
        {/* Icon */}
        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${!message.is_read ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
          {!message.is_read ? <LuMail size={17} /> : <LuMailOpen size={17} />}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className={`truncate text-sm ${!message.is_read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>{senderName}</p>

            <span className="shrink-0 text-xs text-gray-400">{time}</span>
          </div>

          <p className={`mt-0.5 truncate text-sm ${!message.is_read ? "font-medium text-gray-900" : "text-gray-700"}`}>{message.subject || "(No subject)"}</p>

          <p className="mt-1 truncate text-xs text-gray-500">{preview}</p>
          <p className={`mt-1 text-[11px] border w-max rounded p-0.5 ${expiryText === "Expired" ? "text-danger border-danger" : "text-gray-400 border-gray-400"}`}>{expiryText}</p>
        </div>

        {/* Unread indicator */}
        {!message.is_read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />}
      </button>

      {/* Individual delete */}
      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Delete message from ${senderName}`}
        title="Delete message"
        className="mt-1 shrink-0 rounded-md p-2 text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100"
      >
        {deleting ? <LuLoader size={17} className="animate-spin" /> : <LuTrash2 size={17} />}
      </button>
    </div>
  );
};

export default MessageRow;
