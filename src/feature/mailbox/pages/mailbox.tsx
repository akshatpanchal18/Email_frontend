import { useParams } from "react-router-dom";
import Inbox from "./inbox";
import { useGetMailboxQuery } from "../../../store/api/mailboxApi";
import AddressInfo from "../components/address-info";
import ErrorMessage from "../components/error-message";

const Mailbox = () => {
  const { id } = useParams<{ id: string }>();
  const { data: mailbox, isLoading, error } = useGetMailboxQuery(id ?? "", { skip: !id });

  if (error && "data" in error) return <ErrorMessage message="Private Mailbox " />;
  if (!id) return <div>Mailbox address is missing</div>;

  return (
    <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <AddressInfo address={mailbox?.address ?? ""} loading={isLoading} />

      <div className="min-w-0 min-h-0">
        <Inbox mailboxId={mailbox?.id ?? ""} />
      </div>
    </div>
  );
};

export default Mailbox;
