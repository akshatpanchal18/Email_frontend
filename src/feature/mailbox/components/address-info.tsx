import { useState } from "react";
import { LuCheck, LuCopy, LuMail, LuSparkles } from "react-icons/lu";

interface AddressInfoProps {
  address: string;
  loading: boolean;
}

const AddressInfo = ({ address, loading }: AddressInfoProps) => {
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

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <LuMail size={19} />
        </div>

        {/* Address */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-text-muted">Guest mailbox</span>

            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">Temporary</span>
          </div>

          {loading ? (
            <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
          ) : (
            <p title={address} className="truncate text-sm font-semibold text-text-primary">
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
            aria-label={copied ? "Address copied" : "Copy email address"}
            className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-default"
          >
            {copied ? <LuCheck size={15} className="text-green-600" /> : <LuCopy size={15} />}
          </button>
        )}
      </div>

      {/* Guest message */}
      {!loading && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-surface-hover px-3 py-2.5">
          <LuSparkles size={15} className="mt-0.5 shrink-0 text-text-muted" />

          <p className="text-xs leading-5 text-text-muted">You're using a guest mailbox. Create an account to keep your mailbox and access your emails later.</p>
        </div>
      )}
    </div>
  );
};

export default AddressInfo;
