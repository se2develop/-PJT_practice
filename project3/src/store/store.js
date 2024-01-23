// 하나의 저장소를 유지하면서 개별적인 Slice 파일 관리 가능
import { configureStore } from "@reduxjs/toolkit"; 
import directionsSliceReducer from './directionsSlice';

const store = configureStore({
  reducer: {
    directions: directionsSliceReducer,
  },
});

export default store;