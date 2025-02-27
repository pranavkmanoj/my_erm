// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ role, formData }, { rejectWithValue }) => {
  try {
    const apiUrl = role === "user"
      ? "http://localhost:5000/api/auth/user-login"
      : "http://localhost:5000/api/auth/recruiter-login";

    const response = await axios.post(apiUrl, formData, { headers: { "Content-Type": "application/json" } });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Login failed");
  }
});

// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, role: null, error: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
