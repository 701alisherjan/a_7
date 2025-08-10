import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Room {
  id: number;
  type: {
    en: string;
    uz: string;
    ru: string;
  };
  price: number;
  image: string;
  description: {
    en: string;
    uz: string;
    ru: string;
  };
  amenities: {
    en: string[];
    uz: string[];
    ru: string[];
  };
  capacity: number;
}

export interface Hotel {
  id: number;
  name: {
    en: string;
    uz: string;
    ru: string;
  };
  description: {
    en: string;
    uz: string;
    ru: string;
  };
  location: 'mountain' | 'desert';
  image: string;
  rating: number;
  amenities: {
    en: string[];
    uz: string[];
    ru: string[];
  };
  rooms: Room[];
}

interface HotelsState {
  hotels: Hotel[];
  currentHotel: Hotel | null;
  loading: boolean;
  error: string | null;
}

const initialState: HotelsState = {
  hotels: [],
  currentHotel: null,
  loading: false,
  error: null,
};

export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async () => {
    const response = await axios.get('http://localhost:3001/hotels');
    return response.data;
  }
);

export const fetchHotelById = createAsyncThunk(
  'hotels/fetchHotelById',
  async (id: number) => {
    const response = await axios.get(`http://localhost:3001/hotels/${id}`);
    return response.data;
  }
);

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    clearCurrentHotel: (state) => {
      state.currentHotel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch hotels';
      })
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHotel = action.payload;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch hotel';
      });
  },
});

export const { clearCurrentHotel } = hotelsSlice.actions;
export default hotelsSlice.reducer;