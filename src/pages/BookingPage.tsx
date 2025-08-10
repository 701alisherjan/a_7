import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, Users, Mail, User } from 'lucide-react';
import { RootState, AppDispatch } from '../store';
import { fetchHotelById } from '../store/slices/hotelsSlice';
import { createBooking } from '../store/slices/bookingsSlice';
import { login } from '../store/slices/authSlice';

interface BookingFormData {
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const BookingPage: React.FC = () => {
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { currentHotel, loading } = useSelector((state: RootState) => state.hotels);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<BookingFormData>();

  const checkInDate = watch('checkIn');
  const checkOutDate = watch('checkOut');
  const guestCount = watch('guests', 1);

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchHotelById(parseInt(hotelId)));
    }
  }, [dispatch, hotelId]);

  const currentRoom = currentHotel?.rooms.find(room => room.id === parseInt(roomId || '0'));

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !currentRoom) return 0;
    
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return nights > 0 ? nights * currentRoom.price : 0;
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!currentRoom || !currentHotel) return;

    setIsSubmitting(true);
    try {
      const totalPrice = calculateTotalPrice();
      
      await dispatch(createBooking({
        hotelId: currentHotel.id,
        roomId: currentRoom.id,
        guestName: data.guestName,
        email: data.email,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        totalPrice
      })).unwrap();

      // Auto-login user for demo purposes
      dispatch(login({
        id: Date.now().toString(),
        name: data.guestName,
        email: data.email
      }));

      toast.success(t('bookingSuccess'));
      navigate('/profile');
    } catch (error) {
      toast.error(t('bookingError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getThemeStyles = () => {
    if (isDarkMode) {
      switch (currentHotel?.location) {
        case 'mountain':
          return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800';
        case 'desert':
          return 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900';
        default:
          return 'bg-gray-900';
      }
    } else {
      switch (currentHotel?.location) {
        case 'mountain':
          return 'bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100';
        case 'desert':
          return 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100';
        default:
          return 'bg-gray-50';
      }
    }
  };

  if (loading || !currentRoom) {
    return (
      <div className={`min-h-screen pt-24 pb-16 flex items-center justify-center ${getThemeStyles()}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto"></div>
          <p className={`mt-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-16 ${getThemeStyles()}`}>
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/hotels/${hotelId}`)}
          className={`flex items-center mb-8 px-4 py-2 rounded-lg backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-white'
          }`}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Hotel
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Room Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-2xl backdrop-blur-md border ${
              isDarkMode
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/90 border-gray-200 text-gray-900'
            }`}
          >
            <div className="mb-6">
              <img
                src={currentRoom.image}
                alt={currentRoom.type[currentLanguage]}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">{currentRoom.type[currentLanguage]}</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentRoom.description[currentLanguage]}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Price per night:</span>
                <span className="font-bold text-amber-500">${currentRoom.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Maximum guests:</span>
                <span>{currentRoom.capacity}</span>
              </div>
            </div>

            {calculateTotalPrice() > 0 && (
              <div className={`border-t pt-4 ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-amber-500">${calculateTotalPrice()}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-2xl backdrop-blur-md border ${
              isDarkMode
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/90 border-gray-200 text-gray-900'
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  {t('guestName')}
                </label>
                <input
                  {...register('guestName', { required: 'Name is required' })}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    isDarkMode
                      ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.guestName && (
                  <p className="text-red-500 text-sm mt-1">{errors.guestName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  {t('email')}
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    isDarkMode
                      ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    {t('checkIn')}
                  </label>
                  <input
                    {...register('checkIn', { required: 'Check-in date is required' })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                      isDarkMode
                        ? 'bg-gray-800/50 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  {errors.checkIn && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    {t('checkOut')}
                  </label>
                  <input
                    {...register('checkOut', { required: 'Check-out date is required' })}
                    type="date"
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                      isDarkMode
                        ? 'bg-gray-800/50 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  {errors.checkOut && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Users className="h-4 w-4 inline mr-2" />
                  {t('guestCount')}
                </label>
                <select
                  {...register('guests', { 
                    required: 'Number of guests is required',
                    min: { value: 1, message: 'At least 1 guest is required' },
                    max: { value: currentRoom.capacity, message: `Maximum ${currentRoom.capacity} guests allowed` }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    isDarkMode
                      ? 'bg-gray-800/50 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {Array.from({ length: currentRoom.capacity }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : t('submit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;