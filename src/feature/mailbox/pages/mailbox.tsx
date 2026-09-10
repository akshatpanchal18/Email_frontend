import { useParams } from "react-router-dom";
import Inbox from "./inbox";
import { useGetMailboxQuery } from "../../../store/api/mailboxApi";
import AddressInfo from "../components/address-info";
import ErrorMessage from "../components/error-message";

const Mailbox = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: mailbox,
    isLoading,
    error,
  } = useGetMailboxQuery(id ?? "", {
    skip: !id,
  });
  if (error && "data" in error) {
    console.log(error.data);

    return <ErrorMessage message="Private Mailbox " />;
  }
  if (!id) {
    return <div>Mailbox address is missing</div>;
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      {/* Left */}
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <AddressInfo
          address={mailbox?.address ?? ""}
          loading={isLoading}
          isGuest={true}
        />
      </aside>

      {/* Right */}
      <main className="min-w-0">
        <Inbox mailboxId={mailbox?.id ?? ""} />
      </main>
    </div>
  );
};

export default Mailbox;
