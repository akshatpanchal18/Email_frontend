export interface User {
  createdAt: string;
  email: string;
  id: string;
  storage_used_bytes: number;
  updatedAt: string;
}
export type StorageMeta = {
  maxBytes: number;
  percent: number;
  usedBytes: number;
};
export type Mailbox = {
  mailboxCount: number;
  emailCount: number;
  addresses: {
    id: string;
    address: string;
  }[];
};
export interface ProfileData {
  user: User;
  mailbox: Mailbox;
  storage: StorageMeta;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}
