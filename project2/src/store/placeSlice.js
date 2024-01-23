import { createSlice } from "@reduxjs/toolkit";

const placesSlice = createSlice({
  name: "places",
  initialState: [],
  reducers: {
    setSearchResults: (state, action) => {
      const { business_status, formatted_address, name, rating } = action.payload;
      return [
        ...state,
        {
          businessStatus: business_status,
          formattedAddress: formatted_address,
          name: name,
          rating: rating,
        }
      ];
    },
  },
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;