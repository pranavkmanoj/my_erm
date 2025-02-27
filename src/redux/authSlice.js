// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../backend/axiosInstance'; // Adjust path based on your structure

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
//   token: localStorage.getItem('token') || null,
// };

// // Async thunk for login
// export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/login', userData);
//     localStorage.setItem('token', response.data.token);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// // Async thunk for registration
// export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/register', userData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
