import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import { vi, expect, it, beforeEach, afterEach } from "vitest";
import { store } from "@/store/store";
import { showToaster } from "@/store/toaster/module";
import { logout } from "@/store/auth/module";
import request from "../interceptors";

vi.mock("@/store/store", () => ({
  store: {
    dispatch: vi.fn(),
    getState: vi.fn()
  }
}));

vi.mock("@/store/features/toaster/module", () => ({
  showToaster: vi.fn()
}));

vi.mock("@/store/features/auth/module", () => ({
  logout: vi.fn()
}));

let mockAxios: axiosMockAdapter;

beforeEach(() => {
  mockAxios = new axiosMockAdapter(request);

  (store.getState as any).mockReturnValueOnce({
    auth: { accessToken: "fake-token" }
  });

  mockAxios.onGet("/test").reply(200, { data: "Test response" });
});

afterEach(() => {
  mockAxios.reset();
});

/* it("should add Authorization header to request if accessToken is available", async () => {
  const response = await request.get("/test");

  const requestConfig = mockAxios.history.get[0]?.headers;
  expect(requestConfig?.Authorization).toBe("Bearer fake-token");
}); */

it("should show a toast on request error", async () => {
  mockAxios.onGet("/test").networkError();

  try {
    await request.get("/test");
  } catch (error) {
    expect(store.dispatch).toHaveBeenCalledWith(
      showToaster({
        message: "Something went wrong, please try again.",
        severity: "error"
      })
    );
  }
});

it("should handle 401 response and logout the user", async () => {
  mockAxios.onGet("/test").reply(401, {});

  try {
    await request.get("/test");
  } catch (error) {
    expect(store.dispatch).toHaveBeenCalledWith(logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      showToaster({
        message: "Unauthorized access. Please log in again.",
        severity: "error"
      })
    );
  }
});

it("should show 'service unavailable' toast on 503 response", async () => {
  mockAxios.onGet("/test").reply(503, {});

  try {
    await request.get("/test");
  } catch (error) {
    expect(store.dispatch).toHaveBeenCalledWith(
      showToaster({
        message: "Service unavailable. Please try again later.",
        severity: "error"
      })
    );
  }
});

it("should show general error toast on other response errors", async () => {
  mockAxios.onGet("/test").reply(500, {});

  try {
    await request.get("/test");
  } catch (error) {
    expect(store.dispatch).toHaveBeenCalledWith(
      showToaster({
        message: "An error occurred. Please try again.",
        severity: "error"
      })
    );
  }
});

it("should show 'no response' error toast when there is no response", async () => {
  mockAxios.onGet("/test").networkError();

  try {
    await request.get("/test");
  } catch (error) {
    expect(store.dispatch).toHaveBeenCalledWith(
      showToaster({
        message: "No response from server. Please check your internet connection.",
        severity: "error"
      })
    );
  }
});
