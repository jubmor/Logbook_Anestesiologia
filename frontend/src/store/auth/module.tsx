import { UserProps } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshUser } from "./thunks";

interface AuthProps {
  user: UserProps | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthProps = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  status: "idle"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("accessToken", action.payload);
      state.accessToken = action.payload;
    },

    login: (state, action: PayloadAction<UserProps>) => {
      state.user = { ...action.payload, user_type: "intern" };
      state.status = "succeeded";
    },

    logout: (state) => {
      localStorage.removeItem("accessToken");
      Object.assign(state, initialState);
      state.status = "idle";
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...action.payload, user_type: "intern" };
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.status = "failed";
      });
  }
});

export const { setUser, setAccessToken, login, logout } = authSlice.actions;

export default authSlice.reducer;
