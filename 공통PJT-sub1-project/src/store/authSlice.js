import { createSlice } from '@reduxjs/toolkit';

const authInitState = {
  isLogin: false,
  count : -1,
};

const authSlice = createSlice({
  name: 'isLogin',
  initialState: authInitState,
  reducers: {
    LOGIN(state) {
      state.isLogin = true;
      state.count = 1;
    },
    LOGOUT(state) {
      state.isLogin = false;
      state.count = -1;
    },
  },
});

export const authActions = authSlice.actions;
// Sclie 자체를 export하지 않고 reducer 프로퍼티에 접근하여 export
export default authSlice.reducer;