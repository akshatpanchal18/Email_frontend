import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCircleInfo } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

import { useCreateMailAddressMutation } from "../../../store/api/mailboxApi";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import type { CreateMailboxForm } from "../types/type";
import { createMailboxSchema } from "../types/schema";

const DOMAIN = import.meta.env.VITE_DOMAIN_ADDRESS;

interface CreateMailBoxProps {
  isGuest?: boolean;
}

interface ApiValidationError {
  field?: string;
  message?: string;
}

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: ApiValidationError[];
}

interface ApiError {
  data?: ApiErrorResponse;
}

const CreateMailbox: React.FC<CreateMailBoxProps> = ({ isGuest = true }) => {
  const navigate = useNavigate();

  const [createAddress, { isLoading }] = useCreateMailAddressMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateMailboxForm>({
    resolver: zodResolver(createMailboxSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = async (data: CreateMailboxForm) => {
    try {
      const address = data.address.toLowerCase();

      const response = await createAddress({
        address,
      }).unwrap();

      if (response?.success) {
        if (isGuest) {
          navigate(`/${address}`);
        } else navigate(`/dashboard/${address}`);
      }
    } catch (error) {
      const apiError = error as ApiError;

      const validationErrors = apiError.data?.errors;

      if (validationErrors?.length) {
        validationErrors.forEach((error) => {
          if (!error.field || !error.message) {
            return;
          }

          if (error.field === "address") {
            setError("address", {
              type: "server",
              message: error.message,
            });
          }
        });

        return;
      }

      console.error("Failed to create mailbox:", error);
    }
  };

  return (
    <main className="flex h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {isGuest && (
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-xl">
              <img src="/image.png" alt="" />
            </div>
          )}

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Create a temporary email
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Get a disposable inbox instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="flex">
                    <Input
                      {...field}
                      id="address"
                      type="text"
                      autoComplete="off"
                      placeholder="your-address"
                      error={errors.address?.message}
                      className="rounded-r-none"
                      onChange={(event) => {
                        field.onChange(event.target.value.toLowerCase());
                      }}
                    />

                    <div className="flex h-10.5 shrink-0 items-center rounded-r-input border border-l-0 border-border bg-surface-muted px-3 text-sm text-muted">
                      {DOMAIN}
                    </div>
                  </div>
                </div>
              )}
            />

            <Button
              loading={isLoading}
              type="submit"
              disabled={isSubmitting || isLoading}
              className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting || isLoading
                ? "Creating mailbox..."
                : "Create email address"}
            </Button>
          </form>

          {isGuest && (
            <div className="mt-5 rounded-xl border border-border-subtle bg-blue-50 p-4">
              <div className="flex gap-3">
                <FaCircleInfo fontSize={30} className="text-blue-500" />

                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Want to keep your mailbox?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Create an account to keep your mailbox and access your
                    emails later, even after the temporary session expires.
                  </p>

                  <NavLink
                    to="/signup"
                    className="mt-2 inline-block text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
                  >
                    Create an account
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateMailbox;
