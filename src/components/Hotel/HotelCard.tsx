import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Utensils } from 'lucide-react';
import { RootState } from '../../store';
import { Hotel } from '../../store/slices/hotelsSlice';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  const getThemeClasses = () => {
    if (isDarkMode) {
      return 'bg-gray-800 text-white border-gray-700';
    }
    return 'bg-white text-gray-900 border-gray-200';
  };

  const iconMap: { [key: string]: React.ReactNode } = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Bepul WiFi': <Wifi className="h-4 w-4" />,
    'Бесплатный WiFi': <Wifi className="h-4 w-4" />,
    'Swimming Pool': <Car className="h-4 w-4" />,
    'Restaurant': <Utensils className="h-4 w-4" />,
    'Restoran': <Utensils className="h-4 w-4" />,
    'Ресторан': <Utensils className="h-4 w-4" />,
  };

  return (
    <motion.div
      className="relative h-96 cursor-pointer perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl border ${getThemeClasses()}`}>
          <div className="relative h-2/3 overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name[currentLanguage]}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              {hotel.rating}
            </div>
          </div>
          
          <div className="p-6 h-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{hotel.name[currentLanguage]}</h3>
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm capitalize">{hotel.location} area</span>
              </div>
            </div>
            
            <Link
              to={`/hotels/${hotel.id}`}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-center"
            >
              {t('viewDetails')}
            </Link>
          </div>
        </div>

        {/* Back of card */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotateY-180 rounded-2xl overflow-hidden shadow-xl border ${getThemeClasses()}`}>
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">{hotel.name[currentLanguage]}</h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {hotel.description[currentLanguage]}
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-amber-500">{t('amenities')}:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {hotel.amenities[currentLanguage].slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      {iconMap[amenity] || <div className="h-4 w-4 bg-amber-500 rounded-full" />}
                      <span className="ml-2">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Link
              to={`/hotels/${hotel.id}`}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center"
            >
              {t('bookNow')}
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HotelCard;