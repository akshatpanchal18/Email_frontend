import CreateMailbox from "../../mailbox/pages/create-mailbox";
import { useGetMyMailboxesQuery } from "../../../store/api/mailboxApi";
import Inbox from "../../mailbox/pages/inbox";
import MailboxCard from "../components/private-address-card";
import Modal from "../../../components/ui/model";
import Logout from "../../auth/components/logout-dialog";
import { useLogoutMutation } from "../../../store/api/authApi";
import { useState } from "react";
import DummyAds from "../../../ads/dummy-ads";

const PrivateInbox = () => {
  const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);
  const { data: mailboxes = [], isLoading } = useGetMyMailboxesQuery();
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();
  const handleOpenLogoutModel = () => {
    setIsLogoutModelOpen(true);
  };
  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLogoutModelOpen(false);
    }
  };
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Mailbox skeleton */}
          <div className="h-56 animate-pulse rounded-2xl border border-border bg-surface" />

          {/* Inbox skeleton */}
          <div className="h-125 animate-pulse rounded-2xl border border-border bg-surface" />
        </div>
      </div>
    );
  }

  if (mailboxes.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <CreateMailbox />
      </div>
    );
  }

  const mailbox = mailboxes[0];

  return (
    <>
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Account / Mailbox card */}
          <aside className="lg:sticky lg:top-4 flex flex-col gap-4">
            <MailboxCard
              address={mailbox.address}
              loading={false}
              onManageProfile={() => {
                // navigate("/profile");
              }}
              onLogout={() => {
                handleOpenLogoutModel();
              }}
            />
            {/* Advertisement under mailbox */}
            <div className="mx-auto w-full max-w-xl">
              <DummyAds />
            </div>
          </aside>

          {/* Inbox */}
          <section className="min-w-0">
            <Inbox mailboxId={mailbox.id} />
          </section>
        </div>
      </div>
      <Modal size="content" loading={logoutLoading} open={isLogoutModelOpen} onClose={() => setIsLogoutModelOpen(false)}>
        <Logout loading={logoutLoading} onConfirm={handleLogout} />
      </Modal>
    </>
  );
};

export default PrivateInbox;
