import { LuHardDrive, LuMail, LuUser } from "react-icons/lu";

const Profile = () => {
  // Replace these with your API data later
  const profile = {
    email: "john@example.com",
    mailbox: "john@mx.mailflex.app",
    storageUsed: 24.6,
    storageLimit: 100,
  };

  const storagePercentage = (profile.storageUsed / profile.storageLimit) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl px-2 py-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {/* Header */}
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LuUser size={21} />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-text-primary">Profile</h1>

              <p className="mt-0.5 text-sm text-text-muted">Manage your MailFlex account</p>
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="divide-y divide-border">
          {/* Email */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-text-secondary">
                <LuMail size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Account email</p>

                <p className="mt-1 truncate text-sm font-medium text-text-primary">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Mailbox */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LuMail size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Mailbox address</p>

                  <span className="size-1.5 rounded-full bg-green-500" />
                </div>

                <p className="mt-1 truncate text-sm font-semibold text-text-primary">{profile.mailbox}</p>

                <p className="mt-1 text-xs text-text-muted">Your MailFlex email address</p>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-text-secondary">
                <LuHardDrive size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Storage usage</p>

                    <p className="mt-1 text-sm font-semibold text-text-primary">
                      {profile.storageUsed} MB
                      <span className="font-normal text-text-muted"> / {profile.storageLimit} MB</span>
                    </p>
                  </div>

                  <span className="text-xs font-medium text-text-muted">{storagePercentage.toFixed(0)}%</span>
                </div>

                {/* Progress */}
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-hover">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(storagePercentage, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-text-muted">{Math.max(profile.storageLimit - profile.storageUsed, 0).toFixed(1)} MB remaining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-surface-hover/40 px-6 py-4">
          <p className="text-xs leading-5 text-text-muted">Your mailbox storage includes emails and attachments received through MailFlex.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
