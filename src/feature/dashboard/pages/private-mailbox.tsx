import CreateMailbox from "../../mailbox/pages/create-mailbox";
import { useGetMyMailboxesQuery } from "../../../store/api/mailboxApi";
import Inbox from "../../mailbox/pages/inbox";
import AddressInfo from "../../mailbox/components/address-info";

const PrivateInbox = () => {
  const { data: mailboxes = [], isLoading } = useGetMyMailboxesQuery();

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl p-6">
        <div className="h-20 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }
  const mailbox = mailboxes[0];
  return (
    <div>
      <div className="mx-auto w-full max-w-3xl">
        {mailboxes?.length === 0 ? (
          <CreateMailbox />
        ) : (
          <>
            <AddressInfo
              address={mailbox.address}
              loading={isLoading}
              isGuest={false}
            />
            <Inbox mailboxId={mailbox.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default PrivateInbox;
