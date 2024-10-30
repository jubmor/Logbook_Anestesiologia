import { UserProps } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";

interface AuthProps {
  user: UserProps | undefined;
  accessToken: string;
}

const initialState: AuthProps = {
  user: undefined,
  accessToken: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      localStorage.setItem("accessToken", action.payload);
      state.accessToken = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      Object.assign(state, initialState);
    }
  },

  extraReducers: () => {}
});

export const { setUser, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
