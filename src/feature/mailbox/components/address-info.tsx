import { useState } from "react";
import { LuCheck, LuCopy, LuMail, LuSparkles } from "react-icons/lu";

interface AddressInfoProps {
  address: string;
  loading: boolean;
  isGuest: boolean;
}

const AddressInfo = ({ address, loading, isGuest }: AddressInfoProps) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address || copied) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  /*
   * Guest mailbox
   */
  if (isGuest) {
    return (
      <div className="mx-auto my-4 w-full max-w-xl rounded-xl border border-border bg-surface p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <LuMail size={19} />
          </div>

          {/* Address */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Guest mailbox
              </span>

              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                Temporary
              </span>
            </div>

            {loading ? (
              <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
            ) : (
              <p
                title={address}
                className="truncate text-sm font-semibold text-text-primary"
              >
                {address}
              </p>
            )}
          </div>

          {/* Copy */}
          {!loading && (
            <button
              type="button"
              onClick={copyAddress}
              disabled={copied}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-default"
            >
              {copied ? (
                <>
                  <LuCheck size={15} className="text-green-600" />
                  {/* <span className="hidden sm:inline">Copied</span> */}
                </>
              ) : (
                <>
                  <LuCopy size={15} />
                  {/* <span className="hidden sm:inline">Copy</span> */}
                </>
              )}
            </button>
          )}
        </div>

        {/* Guest message */}
        {!loading && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-surface-hover px-3 py-2.5">
            <LuSparkles size={15} className="mt-0.5 shrink-0 text-text-muted" />

            <p className="text-xs leading-5 text-text-muted">
              You're using a guest mailbox. Create an account to keep your
              mailbox and access your emails later.
            </p>
          </div>
        )}
      </div>
    );
  }

  /*
   * Authenticated user mailbox
   */
  return (
    <div className="mx-auto my-4 flex w-full max-w-xl items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
      {/* Icon */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <LuMail size={19} />
      </div>

      {/* Address */}
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Active mailbox
          </span>

          <span className="size-1.5 rounded-full bg-green-500" />
        </div>

        {loading ? (
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
        ) : (
          <p
            title={address}
            className="truncate text-sm font-semibold text-text-primary"
          >
            {address}
          </p>
        )}
      </div>

      {/* Copy */}
      {!loading && (
        <button
          type="button"
          onClick={copyAddress}
          disabled={copied}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-default"
        >
          {copied ? (
            <>
              <LuCheck size={15} className="text-green-600" />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <LuCopy size={15} />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AddressInfo;
