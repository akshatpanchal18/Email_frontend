import { useState } from "react";
import { LuCheck, LuCopy, LuInbox, LuMail, LuSettings, LuSparkles, LuStar } from "react-icons/lu";

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
    <aside className="w-full rounded-xl border border-border bg-surface p-3 shadow-sm">
      {/* ================= MAILBOX HEADER ================= */}
      <div className="flex items-center gap-4 px-1 py-1">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-hover text-text-secondary">
          <LuMail size={20} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-text-muted">Guest mailbox</span>

            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-medium text-amber-700">Temporary</span>
          </div>

          <p title={address} className="truncate text-sm font-semibold text-text-primary">
            {address}
          </p>
        </div>

        <button
          type="button"
          onClick={copyAddress}
          disabled={copied}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          {copied ? <LuCheck size={17} className="text-green-600" /> : <LuCopy size={17} />}
        </button>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="my-3 border-t border-border" />

      {/* ================= GUEST MESSAGE ================= */}
      {!loading && (
        <div className="mt-4 rounded-xl bg-surface-hover px-4 py-3.5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <LuSparkles size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">You're using a guest mailbox.</p>

              <p className="mt-1 text-sm leading-5 text-text-muted">Create an account to keep your mailbox and access your emails later.</p>

              <button type="button" className="mt-2 text-lg font-medium text-primary underline underline-offset-2">
                Create an account
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AddressInfo;
