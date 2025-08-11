import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Users, Wifi, Coffee } from 'lucide-react';
import { RootState } from '../../store';

const hotels = [
  {
    id: "1",
    name: {
      en: "Grand Jizzakh Palace",
      uz: "Grand Jizzakh Saroyi",
      ru: "Гранд Джизак Палас"
    },
    description: {
      en: "A luxurious 5-star hotel in the heart of Jizzakh, offering premium amenities and breathtaking mountain views.",
      uz: "Jizzax markazidagi hashamatli 5 yulduzli mehmonxona, yuqori sifatli xizmatlar va tog'larning ajoyib manzarasi bilan.",
      ru: "Роскошный 5-звездочный отель в центре Джизака с премиальными удобствами и захватывающими видами на горы."
    },
    location: "mountain",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8
  },
  {
    id: "2",
    name: {
      en: "Desert Oasis Resort",
      uz: "Cho'l Vahasi Kurort",
      ru: "Курорт Пустынный Оазис"
    },
    description: {
      en: "An exclusive desert resort offering unique experiences in the stunning landscapes of Uzbekistan.",
      uz: "O'zbekistonning ajoyib landshaftlarida noyob tajribalar taklif etuvchi eksklyuziv cho'l kurti.",
      ru: "Эксклюзивный пустынный курорт, предлагающий уникальные впечатления в потрясающих пейзажах Узбекистана."
    },
    location: "desert",
    image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6
  }
];

// Rooms ma'lumotlari
const rooms = [
  {
    id: 101,
    hotelId: "1",
    type: {
      en: "Deluxe Mountain Suite",
      uz: "Deluxe Tog' Xonasi",
      ru: "Делюкс Горный Номер"
    },
    price: 150,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: {
      en: "Spacious suite with panoramic mountain views, king-size bed, and private balcony.",
      uz: "Tog'larning panorama manzarasi, katta karavot va shaxsiy balkon bilan keng xona.",
      ru: "Просторный номер с панорамным видом на горы, кроватью king-size и собственным балконом."
    },
    amenities: {
      en: ['Free WiFi', 'Mini Bar'],
      uz: ['Bepul WiFi', 'Mini bar'],
      ru: ['Бесплатный WiFi', 'Мини-бар']
    },
    capacity: 2
  },
  {
    id: 201,
    hotelId: "2",
    type: {
      en: "Desert Villa",
      uz: "Cho'l Villasi",
      ru: "Пустынная Вилла"
    },
    price: 200,
    image: "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: {
      en: "Luxurious villa with traditional Uzbek architecture and modern comforts.",
      uz: "An'anaviy o'zbek me'morchiligi va zamonaviy qulayliklar bilan hashamatli villa.",
      ru: "Роскошная вилла с традиционной узбекской архитектурой и современными удобствами."
    },
    amenities: {
      en: ['Free WiFi', 'Mini Bar'],
      uz: ['Bepul WiFi', 'Mini bar'],
      ru: ['Бесплатный WiFi', 'Мини-бар']
    },
    capacity: 4
  }
];

const RoomCard = ({ room, hotel }) => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  const iconMap = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Bepul WiFi': <Wifi className="h-4 w-4" />,
    'Бесплатный WiFi': <Wifi className="h-4 w-4" />,
    'Mini Bar': <Coffee className="h-4 w-4" />,
    'Mini bar': <Coffee className="h-4 w-4" />,
    'Мини-бар': <Coffee className="h-4 w-4" />,
  };

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
        <h3 className="text-xl font-bold mb-1">{room.type[currentLanguage]}</h3>
        <p className="text-sm mb-4 italic">{hotel.name[currentLanguage]}</p>
        
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
            {room.amenities[currentLanguage].map((amenity, index) => (
              <div key={index} className="flex items-center text-xs">
                {iconMap[amenity] || <div className="h-3 w-3 bg-amber-500 rounded-full" />}
                <span className="ml-2">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Link
          to={`/booking/${hotel.id}/${room.id}`}
          className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
        >
          {t('bookRoom')}
        </Link>
      </div>
    </motion.div>
  );
};

const RoomList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map(room => {
        const hotel = hotels.find(h => h.id === room.hotelId);
        return <RoomCard key={room.id} room={room} hotel={hotel} />;
      })}
    </div>
  );
};

export default RoomList;
