import { useParams } from "react-router-dom";
import Inbox from "./inbox";
import { useGetMailboxQuery } from "../../../store/api/mailboxApi";
import AddressInfo from "../components/address-info";

const Mailbox = () => {
  const { address } = useParams<{ address: string }>();
  const { data: mailbox, isLoading } = useGetMailboxQuery(address ?? "", {
    skip: !address,
  });

  if (!address) {
    return <div>Mailbox address is missing</div>;
  }

  return (
    <>
      <AddressInfo address={mailbox?.address ?? address} loading={isLoading} />
      <Inbox mailboxId={mailbox?.id ?? ""} />
    </>
  );
};

export default Mailbox;
