export type Users = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type Ayam = {
  id: number;
  part: string;
};
