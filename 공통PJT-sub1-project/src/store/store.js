// 하나의 저장소를 유지하면서 개별적인 Slice 파일 관리 가능
import { configureStore } from "@reduxjs/toolkit"; 

// 각 Slice 파일에서 export된 Slice.reducer를
import authSliceReducer from './authSlice';

const store = configureStore({
  reducer: {
    // 여기에 사용!
    auth: authSliceReducer,
  },
});

export default store;