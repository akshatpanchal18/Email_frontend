import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

const includedEndpoints = ["login", "signup"];

interface ApiErrorItem {
  field?: string;
  message: string;
  code?: string;
}

interface ApiErrorResponse {
  success: false;
  status: number;
  statusCode: string;
  message: string;
  errors: ApiErrorItem[];
}

interface ErrorPayload {
  status?: number;
  data?: ApiErrorResponse;
}

interface ErrorDetails {
  message?: string;
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

    // Only handle explicitly included endpoints
    if (!endpoint || !includedEndpoints.includes(endpoint)) {
      return next(action);
    }

    const errorResponse = rejectedAction.payload?.data;

    console.log("ERROR_HANDLER =>", errorResponse);

    const message =
      errorResponse?.message ||
      rejectedAction.error?.message ||
      "Something went wrong";

    toast.error(message);
  }

  return next(action);
};
