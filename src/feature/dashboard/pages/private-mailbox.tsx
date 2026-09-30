import CreateMailbox from "../../mailbox/pages/create-mailbox";
import { useGetMyMailboxesQuery } from "../../../store/api/mailboxApi";
import Inbox from "../../mailbox/pages/inbox";
import MailboxCard from "../components/private-address-card";
import Modal from "../../../components/ui/model";
import Logout from "../../auth/components/logout-dialog";
import { useLogoutMutation } from "../../../store/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftRail } from "../../../layout/root-layout";

const PrivateInbox = () => {
  const navigate = useNavigate();
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
      <LeftRail>
        <MailboxCard address={mailbox.address} loading={false} onManageProfile={() => navigate("/d/profile")} onLogout={handleOpenLogoutModel} />
      </LeftRail>

      <div className="h-full min-w-0">
        <Inbox mailboxId={mailbox.id} />
      </div>

      <Modal size="content" loading={logoutLoading} open={isLogoutModelOpen} onClose={() => setIsLogoutModelOpen(false)}>
        <Logout loading={logoutLoading} onConfirm={handleLogout} />
      </Modal>
    </>
  );
};

export default PrivateInbox;
