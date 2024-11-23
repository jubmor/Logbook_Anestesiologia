import { createSlice } from "@reduxjs/toolkit";

export interface DrawerMenuProps {
  isOpen: boolean;
}

const initialState: DrawerMenuProps = {
  isOpen: false
};

const drawerMenuSlice = createSlice({
  name: "drawerMenu",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggleDrawer } = drawerMenuSlice.actions;

export default drawerMenuSlice.reducer;
