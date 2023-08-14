import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyProfile = createAsyncThunk("user/getMyProfile", async () => {
  try {
    const response = await axiosClient.get("/user/getMyProfile");
    return response.result.curUser;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/updateMyProfile", body);
      return response.result.curUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const createTask = createAsyncThunk("task/createTask", async (body) => {
  try {
    const response = await axiosClient.post("/task/createTask", body);
    return response.result.curUser;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (body) => {
  try {
    const response = await axiosClient.post("/task/deleteTask", body);
    return response.result.curUser;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateTask = createAsyncThunk("task/updateTask", async (body) => {
  try {
    const response = await axiosClient.put("/task/updateTask", body);
    return response.result.curUser;
  } catch (error) {
    return Promise.reject(error);
  }
});

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
    theme: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });
    builder.addCase(updateMyProfile.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });
  },
});

export default appConfigSlice.reducer;

export const { setLoading, showToast, setTheme } = appConfigSlice.actions;
