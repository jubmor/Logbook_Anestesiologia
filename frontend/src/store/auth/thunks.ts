import { END_POINT } from "@/config/endpoints";
import request from "@/config/interceptors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const refreshUser = createAsyncThunk("user/refreshUser", async () => {
  const response = await request.get(END_POINT.REFRESH_USER_STATE);
  return response.data;
});
