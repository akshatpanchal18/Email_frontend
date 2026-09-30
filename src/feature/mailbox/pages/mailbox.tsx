import { useParams } from "react-router-dom";
import Inbox from "./inbox";
import { useGetMailboxQuery } from "../../../store/api/mailboxApi";
import AddressInfo from "../components/address-info";
import ErrorMessage from "../components/error-message";
import { LeftRail } from "../../../layout/root-layout";

const Mailbox = () => {
  const { id } = useParams<{ id: string }>();
  const { data: mailbox, isLoading, error } = useGetMailboxQuery(id ?? "", { skip: !id });

  if (error && "data" in error) return <ErrorMessage message="Private Mailbox " />;
  if (!id) return <div>Mailbox address is missing</div>;

  return (
    <>
      <LeftRail>
        <AddressInfo address={mailbox?.address ?? ""} loading={isLoading} />
      </LeftRail>

      <div className="h-full min-w-0">
        <Inbox mailboxId={mailbox?.id ?? ""} />
      </div>
    </>
  );
};

export default Mailbox;
