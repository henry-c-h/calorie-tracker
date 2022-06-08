import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const fetchUserAsync = createAsyncThunk('user/fetchUserId', async () => {
  const response = await fetch('/api/auth/user');
  const data = response.json();
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: {
    [fetchUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.user;
