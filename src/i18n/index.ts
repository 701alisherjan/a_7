import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      hotels: 'Hotels',
      about: 'About',
      contact: 'Contact',
      profile: 'Profile',
      complaints: 'Appeals & Complaints',
      
      // Hero Section
      heroTitle: 'Discover Luxury in the Heart of Jizzakh',
      heroSubtitle: 'Experience unparalleled hospitality in Uzbekistan\'s most beautiful destination',
      exploreHotels: 'Explore Hotels',
      
      // Hotel Cards
      rating: 'Rating',
      bookNow: 'Book Now',
      viewDetails: 'View Details',
      
      // Room Details
      perNight: 'per night',
      guests: 'Guests',
      amenities: 'Amenities',
      bookRoom: 'Book This Room',
      
      // Booking Form
      guestName: 'Guest Name',
      email: 'Email',
      checkIn: 'Check In',
      checkOut: 'Check Out',
      guestCount: 'Number of Guests',
      submit: 'Submit Booking',
      
      // Profile
      myBookings: 'My Bookings',
      editBooking: 'Edit',
      cancelBooking: 'Cancel',
      
      // Complaints
      complaintsTitle: 'Appeals & Complaints',
      complaintsSubtitle: 'We value your feedback. Please share your concerns or suggestions.',
      name: 'Name',
      subject: 'Subject',
      message: 'Message',
      submitComplaint: 'Submit',
      
      // Weather
      weather: 'Current Weather in Jizzakh',
      
      // Toast Messages
      bookingSuccess: 'Booking confirmed successfully!',
      bookingError: 'Failed to create booking. Please try again.',
      complaintSuccess: 'Your message has been sent successfully!',
      complaintError: 'Failed to send message. Please try again.',
    }
  },
  uz: {
    translation: {
      // Navigation
      home: 'Bosh sahifa',
      hotels: 'Mehmonxonalar',
      about: 'Haqida',
      contact: 'Aloqa',
      profile: 'Profil',
      complaints: 'Murojaatlar va Shikoyatlar',
      
      // Hero Section
      heroTitle: 'Jizzax markazida hashamatni kashf eting',
      heroSubtitle: 'O\'zbekistonning eng go\'zal joyida misli ko\'rilmagan mehmondo\'stlikni his eting',
      exploreHotels: 'Mehmonxonalarni ko\'rish',
      
      // Hotel Cards
      rating: 'Reyting',
      bookNow: 'Hozir band qilish',
      viewDetails: 'Batafsil ko\'rish',
      
      // Room Details
      perNight: 'kechasi uchun',
      guests: 'Mehmonlar',
      amenities: 'Qulayliklar',
      bookRoom: 'Bu xonani band qilish',
      
      // Booking Form
      guestName: 'Mehmon ismi',
      email: 'Elektron pochta',
      checkIn: 'Kelish sanasi',
      checkOut: 'Ketish sanasi',
      guestCount: 'Mehmonlar soni',
      submit: 'Buyurtma berish',
      
      // Profile
      myBookings: 'Mening buyurtmalarim',
      editBooking: 'Tahrirlash',
      cancelBooking: 'Bekor qilish',
      
      // Complaints
      complaintsTitle: 'Murojaatlar va Shikoyatlar',
      complaintsSubtitle: 'Sizning fikringiz biz uchun muhim. Iltimos, tashvishlaringiz yoki takliflaringizni baham ko\'ring.',
      name: 'Ism',
      subject: 'Mavzu',
      message: 'Xabar',
      submitComplaint: 'Yuborish',
      
      // Weather
      weather: 'Jizzaxdagi hozirgi ob-havo',
      
      // Toast Messages
      bookingSuccess: 'Buyurtma muvaffaqiyatli tasdiqlandi!',
      bookingError: 'Buyurtma yaratishda xatolik. Qaytadan urining.',
      complaintSuccess: 'Sizning xabaringiz muvaffaqiyatli yuborildi!',
      complaintError: 'Xabar yuborishda xatolik. Qaytadan urining.',
    }
  },
  ru: {
    translation: {
      // Navigation
      home: 'Главная',
      hotels: 'Отели',
      about: 'О нас',
      contact: 'Контакты',
      profile: 'Профиль',
      complaints: 'Обращения и Жалобы',
      
      // Hero Section
      heroTitle: 'Откройте для себя роскошь в сердце Джизака',
      heroSubtitle: 'Испытайте непревзойденное гостеприимство в самом красивом месте Узбекистана',
      exploreHotels: 'Посмотреть отели',
      
      // Hotel Cards
      rating: 'Рейтинг',
      bookNow: 'Забронировать',
      viewDetails: 'Подробнее',
      
      // Room Details
      perNight: 'за ночь',
      guests: 'Гости',
      amenities: 'Удобства',
      bookRoom: 'Забронировать номер',
      
      // Booking Form
      guestName: 'Имя гостя',
      email: 'Электронная почта',
      checkIn: 'Заезд',
      checkOut: 'Выезд',
      guestCount: 'Количество гостей',
      submit: 'Отправить бронирование',
      
      // Profile
      myBookings: 'Мои бронирования',
      editBooking: 'Редактировать',
      cancelBooking: 'Отменить',
      
      // Complaints
      complaintsTitle: 'Обращения и Жалобы',
      complaintsSubtitle: 'Мы ценим ваши отзывы. Пожалуйста, поделитесь своими замечаниями или предложениями.',
      name: 'Имя',
      subject: 'Тема',
      message: 'Сообщение',
      submitComplaint: 'Отправить',
      
      // Weather
      weather: 'Текущая погода в Джизаке',
      
      // Toast Messages
      bookingSuccess: 'Бронирование успешно подтверждено!',
      bookingError: 'Не удалось создать бронирование. Попробуйте еще раз.',
      complaintSuccess: 'Ваше сообщение успешно отправлено!',
      complaintError: 'Не удалось отправить сообщение. Попробуйте еще раз.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;