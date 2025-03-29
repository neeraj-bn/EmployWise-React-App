import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UsersState, UpdateUserPayload, PaginatedResponse } from '../../types/auth';
import toast from 'react-hot-toast';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data: PaginatedResponse = await response.json();
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: UpdateUserPayload) => {
    const { id, ...updateData } = userData;
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return userData;
  }
);

const initialState: UsersState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      toast.success('User deleted successfully');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
        toast.success('User updated successfully');
      })
      .addCase(updateUser.rejected, (state, action) => {
        toast.error(action.error.message || 'Failed to update user');
      });
  },
});

export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;