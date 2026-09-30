import { useState } from "react";
import { LuArrowRight, LuCheck, LuCopy, LuLogOut, LuMail, LuUserRound } from "react-icons/lu";

interface MailboxCardProps {
  address: string;
  loading?: boolean;
  onManageProfile: () => void;
  onLogout: () => void;
}

const MailboxCard = ({ address, loading = false, onManageProfile, onLogout }: MailboxCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address || copied) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy mailbox address:", error);
    }
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      {/* Mailbox */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Mail icon */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LuMail size={19} />
          </div>

          {/* Mailbox information */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-text-muted">Active mailbox</span>

              <span className="size-1.5 rounded-full bg-green-500" />
            </div>

            {loading ? (
              <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
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
              aria-label={copied ? "Copied" : "Copy mailbox address"}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-default"
            >
              {copied ? <LuCheck size={16} className="text-green-600" /> : <LuCopy size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Manage profile */}
      <button type="button" onClick={onManageProfile} className="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-hover">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-text-secondary">
          <LuUserRound size={17} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-primary">Manage Profile</p>

          <p className="mt-0.5 text-xs text-text-muted">Manage your account details</p>
        </div>

        <LuArrowRight size={17} className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Logout */}
      <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-red-50">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
          <LuLogOut size={17} />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-red-600">Logout</p>

          <p className="mt-0.5 text-xs text-text-muted">Sign out of your account</p>
        </div>
      </button>
    </div>
  );
};

export default MailboxCard;
