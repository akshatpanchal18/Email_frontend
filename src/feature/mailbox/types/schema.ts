import z from "zod";

export const createMailboxSchema = z.object({
  address: z
    .string()
    .trim()
    .min(3, "Address must be at least 3 characters")
    .max(64, "Address cannot exceed 64 characters")
    .regex(
      /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/,
      "Use only letters, numbers, dots, underscores, and hyphens",
    ),
});
