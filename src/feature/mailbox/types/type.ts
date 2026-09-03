import type z from "zod";
import type { createMailboxSchema } from "./schema";

export type CreateMailboxForm = z.infer<typeof createMailboxSchema>;
