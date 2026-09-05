import { useParams } from "react-router-dom";
import Inbox from "./inbox";
import { useGetMailboxQuery } from "../../../store/api/mailboxApi";
import AddressInfo from "../components/address-info";
import ErrorMessage from "../components/error-message";

const Mailbox = () => {
  const { address } = useParams<{ address: string }>();
  const {
    data: mailbox,
    isLoading,
    error,
  } = useGetMailboxQuery(address ?? "", {
    skip: !address,
  });
  if (error && "data" in error) {
    console.log(error.data);

    return <ErrorMessage message="Private Mailbox " />;
  }
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
