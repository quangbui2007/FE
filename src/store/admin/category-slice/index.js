import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/lib/http"; // axios instance

export const getCategories = createAsyncThunk("category/getAll", async () => {
  const res = await http.get("/api/categories");
  return res.data;
});

export const addCategory = createAsyncThunk("category/add", async (name) => {
  const res = await http.post("/api/categories", { name });
  return res.data;
});

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    const res = await http.delete(`/api/categories/${id}`);
    return { id };
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.loading = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload.data);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload.id);
      });
  },
});

export default categorySlice.reducer;
