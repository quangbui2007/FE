import http from "@/lib/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  confirmAlertData: null,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/getFeatureImages",
  async () => {
    const response = await http.get(`/api/common/feature/get`);

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/addFeatureImage",
  async (image) => {
    const response = await http.post(`/api/common/feature/add`, { image });

    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/deleteFeatureImage",
  async (id) => {
    const response = await http.post(`/api/common/feature/delete/${id}`);
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    openConfirmAlert: (state, action) => {
      state.confirmAlertData = action.payload || null;
    },
    closeConfirmAlert: (state) => {
      state.confirmAlertData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.featureImageList = state.featureImageList.filter(
          (item) => item._id !== action.payload.data?._id
        );
      });
  },
});
export const { openConfirmAlert, closeConfirmAlert, setLoading } =
  commonSlice.actions;
export default commonSlice.reducer;
