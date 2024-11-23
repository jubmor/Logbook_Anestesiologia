import { RecordFormBasicInfoProps } from "@/types/Records";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecordFormStateProps = {
  recordBasicInfo: Partial<RecordFormBasicInfoProps>;
};

const initialState: RecordFormStateProps = {
  recordBasicInfo: {
    episode: undefined,
    process: undefined,
    rotation: undefined
  }
};

const recordFormSlice = createSlice({
  name: "recordForm",
  initialState,
  reducers: {
    setRecordBasicInfo: (state, action: PayloadAction<RecordFormBasicInfoProps>) => {
      state.recordBasicInfo = action.payload;
    }
  },
  extraReducers: () => {}
});

export const { setRecordBasicInfo } = recordFormSlice.actions;

export default recordFormSlice.reducer;
