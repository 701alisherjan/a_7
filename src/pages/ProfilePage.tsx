import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Calendar, Users, Mail, User, Edit, Trash2 } from 'lucide-react';
import { RootState, AppDispatch } from '../store';
import { fetchBookings, deleteBooking } from '../store/slices/bookingsSlice';
import { login } from '../store/slices/authSlice';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { bookings, loading } = useSelector((state: RootState) => state.bookings);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Auto-login demo user if not authenticated
    if (!isAuthenticated) {
      dispatch(login({
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@jizzakhhotels.com'
      }));
    }
    dispatch(fetchBookings());
  }, [dispatch, isAuthenticated]);

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await dispatch(deleteBooking(id)).unwrap();
        toast.success('Booking cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const getThemeClasses = () => {
    if (isDarkMode) {
      return 'bg-gray-900 text-white';
    }
    return 'bg-gray-50 text-gray-900';
  };

  const getCardClasses = () => {
    if (isDarkMode) {
      return 'bg-gray-800 border-gray-700';
    }
    return 'bg-white border-gray-200';
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 ${getThemeClasses()}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-6">{t('profile')}</h1>
          
          {user && (
            <div className={`p-6 rounded-2xl border ${getCardClasses()}`}>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <div className="flex items-center text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">{t('myBookings')}</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
              <p className="mt-4">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className={`p-8 rounded-2xl border text-center ${getCardClasses()}`}>
              <p className="text-gray-500 mb-4">No bookings found</p>
              <a
                href="/hotels"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Book Your First Stay
              </a>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`p-6 rounded-2xl border ${getCardClasses()}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Booking #{booking.id}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        title={t('editBooking')}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title={t('cancelBooking')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">{booking.guestName}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">{booking.checkIn} to {booking.checkOut}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">{booking.guests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-amber-500">${booking.totalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;