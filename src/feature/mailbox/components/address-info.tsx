import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

interface AddressInfoProps {
  address: string;
  loading: boolean | false;
}

const AddressInfo = ({ address, loading }: AddressInfoProps) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  return (
    <div className="mx-auto my-4 flex w-full max-w-xl items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-sm">
      <div className="min-w-0 flex-1">
        {loading ? (
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
        ) : (
          <>
            <p className="truncate text-sm font-medium text-gray-900">
              {address}
            </p>
          </>
        )}
      </div>

      <button
        onClick={copyAddress}
        disabled={copied}
        className="flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:cursor-default"
      >
        {copied ? (
          <>
            <LuCheck size={15} className="text-green-600" />
            Copied
          </>
        ) : (
          <>
            <LuCopy size={15} />
            Copy
          </>
        )}
      </button>
    </div>
  );
};

export default AddressInfo;
