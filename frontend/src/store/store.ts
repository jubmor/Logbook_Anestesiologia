import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/module";
import toasterReducer from "./toaster/module";
import drawerMenuReducer from "./drawerMenu/module";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toasterReducer,
    drawerMenu: drawerMenuReducer
    //  recordForm: recordFormReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
