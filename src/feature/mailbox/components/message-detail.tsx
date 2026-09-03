import { LuDownload, LuFile, LuPaperclip } from "react-icons/lu";
import type { EmailMessage } from "../../../store/api/mailboxApi";

interface MessageDetailsProps {
  message: EmailMessage;
}

const MessageDetails = ({ message }: MessageDetailsProps) => {
  const date = new Date(message.receivedAt).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      {/* Header */}
      <div className="border-b px-6 py-5 pr-16">
        <h2 className="text-xl font-semibold text-slate-900">
          {message.subject || "(No subject)"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{date}</p>
      </div>

      {/* Sender / recipient */}
      <div className="border-b bg-slate-50/70 px-6 py-4">
        <div className="space-y-2 text-sm">
          <div className="flex gap-3">
            <span className="w-16 shrink-0 text-slate-500">From</span>
            <span className="break-all font-medium text-slate-800">
              {message.from}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="w-16 shrink-0 text-slate-500">To</span>
            <span className="break-all text-slate-700">{message.to}</span>
          </div>
        </div>
      </div>

      {/* Message body */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        {message.html ? (
          <div
            className="prose prose-sm max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: message.html }}
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {message.text || "This message has no content."}
          </p>
        )}

        {/* Attachments */}
        {/* {message.attachments.length > 0 && (
          <div className="mt-8 border-t pt-5">
            <div className="mb-3 flex items-center gap-2">
              <LuPaperclip className="h-4 w-4 text-slate-500" />

              <h3 className="text-sm font-semibold text-slate-800">
                Attachments ({message.attachments.length})
              </h3>
            </div>

            <div className="space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between rounded-lg border bg-white px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                      <LuFile className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {attachment.filename}
                      </p>

                      <p className="text-xs text-slate-500">
                        {attachment.content_type} ·{" "}
                        {(attachment.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <LuDownload className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default MessageDetails;
