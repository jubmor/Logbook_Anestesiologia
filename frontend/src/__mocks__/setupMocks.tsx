import "@testing-library/jest-dom";

import React from "react";
import { vi } from "vitest";

import { useScreenWidth } from "../hooks/useScreenWidth";
import { useLocation, useNavigate } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import authReducer from "../store/features/auth/module";
import toasterReducer from "../store/features/toaster/module";
import drawerMenuReducer from "../store/features/drawerMenu/module";
import { Provider } from "react-redux";

const mockStore = configureStore({
  reducer: {
    //auth: authReducer,
    toast: toasterReducer,
    drawerMenu: drawerMenuReducer
  }
});

vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
  Provider: ({ children }: { children: React.ReactNode }) => (
    <Provider store={mockStore}>{children}</Provider>
  )
}));

vi.mock("@/store/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ path, element }: { path: string; element: React.ReactNode }) => <div>{element}</div>
}));

vi.mock("@/hooks/useScreenWidth", () => ({
  useScreenWidth: vi.fn()
}));

beforeAll(() => {
  vi.mocked(useNavigate).mockImplementation(() => vi.fn());

  vi.mocked(useLocation).mockImplementation(() => ({
    pathname: "/home",
    state: null,
    key: "mockKey",
    search: "",
    hash: ""
  }));

  vi.mocked(useAppDispatch).mockImplementation(() => vi.fn());
  vi.mocked(useAppSelector).mockImplementation(() => ({ isOpen: true }));
  vi.mocked(useScreenWidth).mockImplementation(() => 400);
});
