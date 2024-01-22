import { createSlice } from '@reduxjs/toolkit';

const directionsInitState = {
  startAddress: '',
  endAddress: '',
  startPlaceId: '',
  endPlaceId: '',
  distance: 0,
  duration: 0,
};


const directionsSlice = createSlice({
  name: 'directions',
  initialState: directionsInitState,
  reducers: {
    setDirections: (state, action) => {
      const { startAddress, endAddress, distance, duration, startPlaceId, endPlaceId } = action.payload;
      state.startAddress = startAddress;
      state.endAddress = endAddress; 
      state.startPlaceId = startPlaceId,
      state.endPlaceId = endPlaceId,
      state.distance = distance;
      state.duration = duration;
    },
  },
});


export const directionsActions = directionsSlice.actions;
// Slice 자체를 export하지 않고 reducer 프로퍼티에 접근하여 export
export default directionsSlice.reducer;