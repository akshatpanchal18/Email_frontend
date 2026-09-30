import { LuFile, LuFileArchive, LuFileText, LuHardDrive, LuImage, LuVideo } from "react-icons/lu";
import { useState } from "react";
import { useGetAllAttachmentsQuery } from "../../../store/api/mailboxApi";

interface Props {
  mailboxId: string;
}

const ITEMS_PER_PAGE = 20;

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

const getFileType = (contentType: string) => {
  if (contentType.startsWith("image/")) {
    return "image";
  }

  if (contentType.startsWith("video/")) {
    return "video";
  }

  if (contentType === "application/pdf" || contentType.includes("document") || contentType.includes("text")) {
    return "document";
  }

  if (contentType.includes("zip") || contentType.includes("compressed") || contentType.includes("archive")) {
    return "archive";
  }

  return "file";
};

const ViewAllMedia = ({ mailboxId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllAttachmentsQuery(
    {
      mailboxId,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    },
    {
      skip: !mailboxId,
    },
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl">
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="size-11 animate-pulse rounded-xl bg-surface-hover" />

            <div className="space-y-2">
              <div className="h-5 w-24 animate-pulse rounded bg-surface-hover" />
              <div className="h-4 w-48 animate-pulse rounded bg-surface-hover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-border">
              <div className="aspect-video animate-pulse bg-surface-hover" />

              <div className="space-y-2 p-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface-hover" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-surface-hover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const attachments = data?.items ?? [];
  console.log(attachments);

  return (
    <div className="flex h-[90vh] min-h-0 w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LuHardDrive size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary">Storage</h2>

            <p className="mt-0.5 text-sm text-text-muted">Manage your MailFlex storage usage</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="shrink-0 border-b border-border px-6 py-4">
        <p className="text-sm font-medium text-text-primary">{data?.total ?? 0} attachments</p>

        <p className="mt-0.5 text-xs text-text-muted">{formatBytes(data?.totalBytes ?? 0)} used</p>
      </div>

      {/* SCROLLABLE ATTACHMENTS */}
      <div className=" min-h-0 flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {attachments.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center">
            <div className="text-center">
              <LuHardDrive size={28} className="mx-auto text-text-muted" />

              <p className="mt-3 text-sm font-medium text-text-primary">No attachments</p>

              <p className="mt-1 text-xs text-text-muted">Your mailbox doesn't have any stored attachments.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {attachments.map((attachment) => {
              const type = getFileType(attachment.content_type);

              return (
                <div key={attachment.id} className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface">
                  {/* Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-surface-hover">
                    {type === "image" ? (
                      <>
                        {attachment.url ? (
                          <img
                            src={attachment.url}
                            alt={attachment.filename}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                        ) : null}

                        <div className={`${attachment.url ? "hidden" : ""} flex h-full w-full items-center justify-center`}>
                          <LuImage size={32} className="text-text-muted" />
                        </div>
                      </>
                    ) : type === "video" ? (
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-surface text-text-secondary">
                          <LuVideo size={24} />
                        </div>

                        <span className="mt-2 text-xs text-text-muted">Video</span>
                      </div>
                    ) : type === "document" ? (
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                          <LuFileText size={24} />
                        </div>

                        <span className="mt-2 text-xs text-text-muted">Document</span>
                      </div>
                    ) : type === "archive" ? (
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-surface text-text-secondary">
                          <LuFileArchive size={24} />
                        </div>

                        <span className="mt-2 text-xs text-text-muted">Archive</span>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-surface text-text-secondary">
                          <LuFile size={24} />
                        </div>

                        <span className="mt-2 text-xs text-text-muted">File</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 p-3">
                    <p className="truncate text-sm font-medium text-text-primary" title={attachment.filename}>
                      {attachment.filename}
                    </p>

                    <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-xs text-text-muted" title={attachment.content_type}>
                        {attachment.content_type}
                      </span>

                      <span className="shrink-0 text-xs text-text-muted">{formatBytes(attachment.size)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination - stays fixed */}
      {data && data.total > data.limit && (
        <div className="flex shrink-0 items-center justify-between border-t border-border px-6 py-4">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="text-sm text-text-muted transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-xs text-text-muted">
            Page {data.page} of {Math.ceil(data.total / data.limit)}
          </span>

          <button
            type="button"
            disabled={currentPage >= Math.ceil(data.total / data.limit)}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="text-sm text-text-muted transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAllMedia;
