import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStart(state) {
      state.loading = true;
    },
    setAuthSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { setAuthStart, setAuthSuccess, logout } =
  authSlice.actions;

export default authSlice.reducer;