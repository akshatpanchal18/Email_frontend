import { isFulfilled } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

const includedEndpoints = [""];

type RTKQueryAction = {
  meta: {
    arg: {
      endpointName: string;
    };
  };
  payload?: {
    message?: string;
  };
};

export const successMiddleware: Middleware = () => (next) => (action) => {
  if (isFulfilled(action)) {
    const { endpointName } = (action as RTKQueryAction).meta.arg;

    if (includedEndpoints.includes(endpointName)) {
      const message = (action as RTKQueryAction).payload?.message;

      if (message) {
        toast.success(message);
      }
    }
  }

  return next(action);
};
