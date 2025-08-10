import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, ArrowLeft } from 'lucide-react';
import { RootState, AppDispatch } from '../store';
import { fetchHotelById, clearCurrentHotel } from '../store/slices/hotelsSlice';
import { setTheme } from '../store/slices/themeSlice';
import RoomCard from '../components/Room/RoomCard';
import SkeletonLoader from '../components/UI/SkeletonLoader';

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { currentHotel, loading } = useSelector((state: RootState) => state.hotels);
  const { isDarkMode, currentTheme } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    if (id) {
      dispatch(fetchHotelById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentHotel());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentHotel) {
      dispatch(setTheme(currentHotel.location));
    }
  }, [currentHotel, dispatch]);

  const getThemeStyles = () => {
    if (isDarkMode) {
      switch (currentTheme) {
        case 'mountain':
          return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800';
        case 'desert':
          return 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900';
        default:
          return 'bg-gray-900';
      }
    } else {
      switch (currentTheme) {
        case 'mountain':
          return 'bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100';
        case 'desert':
          return 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100';
        default:
          return 'bg-gray-50';
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-24 pb-16 ${getThemeStyles()}`}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <SkeletonLoader height="h-8" className="w-1/3 mb-4" />
            <SkeletonLoader height="h-96" className="w-full rounded-2xl" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md">
                <SkeletonLoader height="h-48" className="mb-4" />
                <SkeletonLoader height="h-6" className="mb-2" />
                <SkeletonLoader height="h-4" className="mb-4" />
                <SkeletonLoader height="h-10" className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentHotel) {
    return (
      <div className={`min-h-screen pt-24 pb-16 flex items-center justify-center ${getThemeStyles()}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Hotel not found
          </h2>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Hotels
          </button>
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
          onClick={() => navigate('/hotels')}
          className={`flex items-center mb-8 px-4 py-2 rounded-lg backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-white'
          }`}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Hotels
        </motion.button>

        {/* Hotel Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={currentHotel.image}
              alt={currentHotel.name[currentLanguage]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentHotel.name[currentLanguage]}
              </h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="capitalize">{currentHotel.location} area, Jizzakh</span>
                </div>
                <div className="flex items-center bg-amber-500 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  {currentHotel.rating}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hotel Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mb-12 p-8 rounded-2xl backdrop-blur-md border ${
            isDarkMode
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-white/80 border-gray-200 text-gray-900'
          }`}
        >
          <p className="text-lg leading-relaxed">
            {currentHotel.description[currentLanguage]}
          </p>
        </motion.div>

        {/* Rooms Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Available Rooms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentHotel.rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <RoomCard room={room} hotelId={currentHotel.id} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HotelDetailPage;