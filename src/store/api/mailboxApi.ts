import type { EmailMessage, MailBox, PaginationMeta } from "../types/mailbox";
import baseApi from "./baseApi";

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
    messages: {
      messages: EmailMessage[];
      pagination: PaginationMeta;
    };
  };
}

export interface GetMyMessagesParams {
  mailboxId: string;
  page: number;
  limit: number;
}

export interface GetMyMessagesResult {
  messages: EmailMessage[];
  pagination: PaginationMeta;
}

export const mailBoxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Returns ONE mailbox
    getMailbox: builder.query<MailBox, string>({
      query: (id) => ({
        url: `/mailbox/${id}`,
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

      providesTags: ["MY_MAILBOXES"],
    }),

    // Create mailbox
    createMailAddress: builder.mutation<MailBox, unknown>({
      query: (body) => ({
        url: "/mailbox/create",
        method: "POST",
        body,
      }),

      transformResponse: (response: MailBoxResponse) => {
        return response.data.mailbox;
      },

      invalidatesTags: ["MY_MAILBOXES"],
    }),

    // Get paginated messages
    getMyMessages: builder.query<GetMyMessagesResult, GetMyMessagesParams>({
      query: ({ mailboxId, page, limit = 20 }) => ({
        url: `/mailbox/my-messages/${mailboxId}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),

      transformResponse: (response: EmailMessageResponse): GetMyMessagesResult => {
        return {
          messages: response.data.messages.messages ?? [],
          pagination: response.data.messages.pagination,
        };
      },
    }),

    // Mark message as read
    markMessageAsRead: builder.mutation<
      EmailMessage,
      {
        mailboxId: string;
        messageId: string;
        page: number;
        limit: number;
      }
    >({
      query: ({ mailboxId, messageId }) => ({
        url: `/mailbox/${mailboxId}/messages/${messageId}/read`,
        method: "PATCH",
      }),

      async onQueryStarted({ mailboxId, messageId, page, limit }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          mailBoxApi.util.updateQueryData(
            "getMyMessages",
            {
              mailboxId,
              page,
              limit,
            },
            (draft) => {
              const message = draft.messages.find((message) => message.id === messageId);

              if (message) {
                message.is_read = true;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateMailAddressMutation, useGetMailboxQuery, useGetMyMailboxesQuery, useGetMyMessagesQuery, useMarkMessageAsReadMutation } = mailBoxApi;
