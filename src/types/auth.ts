export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersState {
  users: User[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface UpdateUserPayload {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface PaginatedResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}