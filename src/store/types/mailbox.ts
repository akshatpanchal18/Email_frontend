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
