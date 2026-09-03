import { useNavigate } from "react-router-dom";
import { useGetMyMailboxesQuery } from "../../../store/api/mailboxApi";
import CreateMailbox from "../../mailbox/pages/create-mailbox";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: mailboxes = [], isLoading } = useGetMyMailboxesQuery();

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl p-6">
        <div className="h-20 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      {mailboxes?.length === 0 ? (
        <CreateMailbox isGuest={false} />
      ) : (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Mailboxes
          </h2>

          {mailboxes.map((mailbox) => {
            const name = mailbox.address.split("@")[0];

            return (
              <button
                key={mailbox.id}
                onClick={() => navigate(`/dashboard/${name}`)}
                className="flex items-center justify-between w-full cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md active:translate-y-0 active:shadow-sm"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {mailbox.address}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Status: {mailbox.status}
                  </p>
                </div>

                <span className="ml-4 shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {mailbox.status}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
