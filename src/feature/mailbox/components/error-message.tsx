import { LuCircleAlert } from "react-icons/lu";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="max-w-2xl mx-auto my-12">
      <div
        role="alert"
        className="flex w-full items-center gap-3 rounded-lg border border-danger/20 bg-danger/10 px-4 py-3 text-danger"
      >
        <LuCircleAlert className="size-5 shrink-0" />

        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
