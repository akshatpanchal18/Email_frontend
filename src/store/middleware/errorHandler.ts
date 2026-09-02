import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

const includedEndpoints = ["login", "signup"];

interface ErrorDetails {
  message?: string;
}

interface ErrorPayload {
  data?: {
    message?: string;
  };
}

interface ErrorMetaArg {
  endpointName?: string;
}

interface ErrorMeta {
  arg?: ErrorMetaArg;
}

interface RejectedAction {
  type: string;
  payload?: ErrorPayload;
  error?: ErrorDetails;
  meta?: ErrorMeta;
}

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const rejectedAction = action as RejectedAction;

    const endpoint = rejectedAction.meta?.arg?.endpointName;

    // Ignore everything that is not explicitly included
    if (!endpoint || !includedEndpoints.includes(endpoint)) {
      return next(action);
    }

    console.log("ERROR_HANDLER =>", rejectedAction.payload);

    const message =
      rejectedAction.payload?.data?.message ||
      rejectedAction.error?.message ||
      "Something went wrong";

    toast.error(message);
  }

  return next(action);
};
