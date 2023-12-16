import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSet: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    userError: (state, action) => {
      state.info = null;
      state.loading = false;
      state.error = action.payload;
    }
  },
})

export const { userSet, userError } = userSlice.actions;

export default userSlice.reducer;