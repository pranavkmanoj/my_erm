import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: { jobList: [] },
  reducers: {
    setJobs: (state, action) => {
      state.jobList = action.payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
