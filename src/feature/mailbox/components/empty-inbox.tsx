import { LuInbox } from "react-icons/lu";

const EmptyInbox = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <LuInbox size={22} className="text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold text-gray-900">
        Your inbox is empty
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        New messages will appear here.
      </p>
    </div>
  );
};

export default EmptyInbox;
