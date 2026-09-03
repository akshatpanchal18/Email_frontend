import baseApi from "./baseApi";

export type MailBoxStatus = "OWNED" | "GUEST" | "NONE";

export interface MailBox {
  id: string;
  address: string;
  owner_id: string | null;
  status: MailBoxStatus;
  createdAt?: string;
  updatedAt?: string;
}
export interface EmailAttachment {
  id: string;
  message_id: string;
  filename: string;
  content_type: string;
  size: number;
  storageKey: string;
}
export interface EmailMessage {
  id: string;
  mailbox_id: string;
  message_id: string | null;
  from: string;
  to: string;
  subject: string | null;
  text: string | null;
  html: string | null;
  raw_size_bytes: number | null;
  owner_id: string | null;
  is_read: boolean;
  receivedAt: string;
  createdAt: string;
  expiresAt: string;
  attachments: EmailAttachment[] | [] | null;
}

export interface MailBoxResponse {
  success: boolean;
  message: string;
  data: {
    mailbox: MailBox;
  };
}

export interface MailBoxesResponse {
  success: boolean;
  message: string;
  data: {
    mailbox: MailBox[];
  };
}
export interface EmailMessageResponse {
  success: boolean;
  message: string;
  data: {
    messages: EmailMessage[];
  };
}

export const mailBoxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Returns ONE mailbox
    getMailbox: builder.query<MailBox, string>({
      query: (address) => ({
        url: `/mailbox/mailbox/${address}`,
        method: "GET",
      }),

      transformResponse: (response: MailBoxResponse) => {
        return response.data.mailbox;
      },
    }),

    // Returns MANY mailboxes
    getMyMailboxes: builder.query<MailBox[], void>({
      query: () => ({
        url: "/mailbox/my-mailboxes",
        method: "GET",
      }),

      transformResponse: (response: MailBoxesResponse) => {
        return response.data.mailbox || [];
      },
    }),

    createMailAddress: builder.mutation({
      query: (body) => ({
        url: "/mailbox/create",
        method: "POST",
        body,
      }),
    }),
    getMyMessages: builder.query<EmailMessage[], string>({
      query: (id: string) => ({
        url: `/mailbox/my-messages/${id}`,
        method: "GET",
      }),

      transformResponse: (response: EmailMessageResponse) => {
        return response.data.messages || [];
      },
    }),
    markMessageAsRead: builder.mutation<
      EmailMessage,
      { mailboxId: string; messageId: string }
    >({
      query: ({ mailboxId, messageId }) => ({
        url: `/mailbox/${mailboxId}/messages/${messageId}/read`,
        method: "PATCH",
      }),

      async onQueryStarted(
        { mailboxId, messageId },
        { dispatch, queryFulfilled },
      ) {
        // optimistic update — flip is_read immediately, don't wait for the response
        const patchResult = dispatch(
          mailBoxApi.util.updateQueryData(
            "getMyMessages",
            mailboxId,
            (draft) => {
              const msg = draft.find((m) => m.id === messageId);
              if (msg) msg.is_read = true;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // roll back if the request actually fails
        }
      },
    }),
  }),
});

export const {
  useCreateMailAddressMutation,
  useGetMailboxQuery,
  useGetMyMailboxesQuery,
  useGetMyMessagesQuery,
  useMarkMessageAsReadMutation,
} = mailBoxApi;
