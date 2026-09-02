import type z from "zod";
import type { loginSchema, SignupSchema } from "./schema";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
