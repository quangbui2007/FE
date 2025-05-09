import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@/lib/http";

// GET users
export const getUsers = createAsyncThunk("user/getAll", async () => {
  const res = await http.get("/api/users");
  return res.data;
});

// ADD user
export const addUser = createAsyncThunk("user/add", async (user) => {
  const res = await http.post("/api/users", user);
  return res.data;
});

// DELETE user
export const deleteUser = createAsyncThunk("user/delete", async (id) => {
  await http.delete(`/api/users/${id}`);
  return { id };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload.data);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload.id);
      });
  },
});

export default userSlice.reducer;
