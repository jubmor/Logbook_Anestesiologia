import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/module";
import toasterReducer from "./features/toaster/module";
import drawerMenuReducer from "./features/drawerMenu/module";
// import recordFormReducer from "./features/recordForm/module";

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
