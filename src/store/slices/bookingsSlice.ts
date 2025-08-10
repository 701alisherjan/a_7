import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Booking {
  id: string;
  hotelId: number;
  roomId: number;
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    const response = await axios.get('http://localhost:3001/bookings');
    return response.data;
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    };
    const response = await axios.post('http://localhost:3001/bookings', newBooking);
    return response.data;
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, data }: { id: string; data: Partial<Booking> }) => {
    const response = await axios.patch(`http://localhost:3001/bookings/${id}`, data);
    return response.data;
  }
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id: string) => {
    await axios.delete(`http://localhost:3001/bookings/${id}`);
    return id;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(b => b.id !== action.payload);
      });
  },
});

export default bookingsSlice.reducer;