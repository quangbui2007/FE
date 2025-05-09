import http from "@/lib/http";
import { setLoading } from "@/store/common-slice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoadingCheckAuth: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await http.post("/api/auth/register", formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await http.post("/api/auth/login", formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await http.post(
      "/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await http.get("/api/auth/check-auth", {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        action.asyncDispatch(setLoading(true));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        action.asyncDispatch(setLoading(false));
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        action.asyncDispatch(setLoading(false));
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        action.asyncDispatch(setLoading(true));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        action.asyncDispatch(setLoading(false));

        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        action.asyncDispatch(setLoading(false));
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoadingCheckAuth = true;
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoadingCheckAuth = false;
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoadingCheckAuth = false;
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
