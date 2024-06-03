import { createSlice } from "@reduxjs/toolkit";

interface ApiResponseState {
  //error
  errorMessage: string;
  openErrorAlert: boolean;
  //success
  successMessage: string;
  openSuccessAlert: boolean;
}

const initialState: ApiResponseState = {
  errorMessage: "",
  openErrorAlert: false,
  successMessage: "",
  openSuccessAlert: false,
};

const apiResponseSlice = createSlice({
  name: "apiResponse",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload;
      state.openErrorAlert = true;
    },
    setMessage: (state, action) => {
      state.successMessage = action.payload;
      state.openSuccessAlert = true;
    },
    clearApiResponseState: () => {
      return initialState;
    },
  },
});

export const { setError, setMessage, clearApiResponseState } =
  apiResponseSlice.actions;
export default apiResponseSlice.reducer;
