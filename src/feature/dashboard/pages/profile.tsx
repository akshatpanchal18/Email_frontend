import { LuHardDrive, LuMail, LuUser, LuCircleAlert, LuArrowLeft, LuDot } from "react-icons/lu";
import { useGetProfileQuery } from "../../../store/api/userApi";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import Modal from "../../../components/ui/model";
import ViewAllMedia from "../components/media-expolerer";

const formatStorage = (bytes: number) => {
  const mb = bytes / (1024 * 1024);

  if (mb < 1) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${mb.toFixed(1)} MB`;
};

const ProfileSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-2 py-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {/* Header */}
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="size-11 animate-pulse rounded-xl bg-surface-hover" />

            <div className="space-y-2">
              <div className="h-5 w-24 animate-pulse rounded bg-surface-hover" />
              <div className="h-4 w-48 animate-pulse rounded bg-surface-hover" />
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {/* Email */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="size-9 shrink-0 animate-pulse rounded-lg bg-surface-hover" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-surface-hover" />
                <div className="h-4 w-56 animate-pulse rounded bg-surface-hover" />
              </div>
            </div>
          </div>

          {/* Mailbox */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="size-9 shrink-0 animate-pulse rounded-lg bg-surface-hover" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 animate-pulse rounded bg-surface-hover" />
                <div className="h-4 w-48 animate-pulse rounded bg-surface-hover" />
                <div className="h-3 w-40 animate-pulse rounded bg-surface-hover" />
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="size-9 shrink-0 animate-pulse rounded-lg bg-surface-hover" />

              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-24 animate-pulse rounded bg-surface-hover" />
                    <div className="h-4 w-32 animate-pulse rounded bg-surface-hover" />
                  </div>

                  <div className="h-3 w-8 animate-pulse rounded bg-surface-hover" />
                </div>

                <div className="h-2 w-full animate-pulse rounded-full bg-surface-hover" />
                <div className="h-3 w-28 animate-pulse rounded bg-surface-hover" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-surface-hover/40 px-6 py-4">
          <div className="h-3 w-72 animate-pulse rounded bg-surface-hover" />
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [showStorageModal, setShowStorageModal] = useState(false);

  const location = useLocation();

  const mailboxId = location.state?.mailboxId;
  const { data, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-full max-w-2xl px-2 py-6">
        <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 text-center shadow-sm">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <LuCircleAlert size={21} />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-text-primary">Unable to load profile</h2>

          <p className="mt-1 text-xs text-text-muted">Something went wrong while fetching your account details.</p>
        </div>
      </div>
    );
  }

  const { user, mailbox, storage } = data;

  const storagePercentage = Math.min(storage.percent, 100);

  const remainingBytes = Math.max(storage.maxBytes - storage.usedBytes, 0);

  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-2 py-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          {/* Header */}
          <div className="border-b border-border px-6 py-5">
            <NavLink to="/d/inbox" className="mb-5 inline-flex items-center text-sm font-medium text-text-muted transition-colors hover:text-text-primary">
              <span className="flex items-center gap-2">
                <LuArrowLeft /> Back
              </span>
            </NavLink>
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

                  <p className="mt-1 truncate text-sm font-medium text-text-primary">{user.email}</p>
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

                  <div className="mt-1 space-y-1">
                    {mailbox.addresses.map((mailboxAddress) => (
                      <p key={mailboxAddress.id} className="truncate text-sm font-semibold text-text-primary">
                        {mailboxAddress.address}
                      </p>
                    ))}
                  </div>

                  <p className="mt-1 text-xs text-text-muted">
                    {mailbox.mailboxCount} {mailbox.mailboxCount === 1 ? "mailbox" : "mailboxes"} · {mailbox.emailCount} {mailbox.emailCount === 1 ? "email" : "emails"}
                  </p>
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
                        {formatStorage(storage.usedBytes)}

                        <span className="font-normal text-text-muted"> / {formatStorage(storage.maxBytes)}</span>
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setShowStorageModal(true)}>
                      View
                    </Button>
                  </div>

                  {/* Progress */}
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-hover">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${storagePercentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs text-text-muted">{storagePercentage.toFixed(0)}%</span>

                    <span className="text-xs text-text-muted">
                      <LuDot />
                    </span>

                    <span className="text-xs text-text-muted">{formatStorage(remainingBytes)} remaining</span>
                  </div>
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
      <Modal open={showStorageModal} onClose={() => setShowStorageModal(false)}>
        <ViewAllMedia mailboxId={mailboxId} />
      </Modal>
    </>
  );
};

export default Profile;
