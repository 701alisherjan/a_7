import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Users, Wifi, Coffee } from 'lucide-react';
import { RootState } from '../../store';
import { Room } from '../../store/slices/hotelsSlice';

interface RoomCardProps {
  hotelId: number;
  roomId: number; // qaysi room kerakligini bilish uchun
}

const RoomCard: React.FC<RoomCardProps> = ({ hotelId, roomId }) => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  const [room, setRoom] = useState<Room | null>(null);

  const iconMap: { [key: string]: React.ReactNode } = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Bepul WiFi': <Wifi className="h-4 w-4" />,
    'Бесплатный WiFi': <Wifi className="h-4 w-4" />,
    'Mini Bar': <Coffee className="h-4 w-4" />,
    'Mini bar': <Coffee className="h-4 w-4" />,
    'Мини-бар': <Coffee className="h-4 w-4" />,
  };

  useEffect(() => {
    fetch(`http://localhost:3001/hotels/${hotelId}`)
      .then(res => res.json())
      .then(data => {
        const foundRoom = data.rooms.find((r: Room) => r.id === roomId);
        setRoom(foundRoom);
      });
  }, [hotelId, roomId]);

  if (!room) return <p>Loading...</p>;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`rounded-2xl overflow-hidden backdrop-blur-md border shadow-xl ${
        isDarkMode
          ? 'bg-white/10 border-white/20 text-white'
          : 'bg-white/90 border-gray-200 text-gray-900'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.image}
          alt={room.type[currentLanguage]}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${room.price}/{t('perNight')}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{room.type[currentLanguage]}</h3>

        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {room.description[currentLanguage]}
        </p>

        <div className="flex items-center mb-4 text-sm">
          <Users className="h-4 w-4 text-amber-500 mr-2" />
          <span>{room.capacity} {t('guests')}</span>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-amber-500 mb-2">{t('amenities')}:</h4>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities[currentLanguage].slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center text-xs">
                {iconMap[amenity] || <div className="h-3 w-3 bg-amber-500 rounded-full" />}
                <span className="ml-2">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          to={`/booking/${hotelId}/${room.id}`}
          className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
        >
          {t('bookRoom')}
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
