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

// Define a type for the log data
export interface AyamLog {
  id: number;
  part_name: string;
  rating: number;
  created_at: string; // or Date if it's a Date object
  notes: string;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
