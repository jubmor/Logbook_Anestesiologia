import { createSlice } from "@reduxjs/toolkit";

interface MenuProps {
  isOpen: boolean;
}

const initialState: MenuProps = {
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
