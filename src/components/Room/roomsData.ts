
import { Room } from "../../store/slices/hotelsSlice";

export const roomData: Room[] = [
  {
    id: 1,
    type: {
      en: "Deluxe Room",
      uz: "Deluxe xona",
      ru: "Делюкс номер",
    },
    description: {
      en: "Spacious deluxe room with a balcony and city view.",
      uz: "Balkon va shahar manzarasiga ega keng deluxe xona.",
      ru: "Просторный делюкс номер с балконом и видом на город.",
    },
    price: 120,
    capacity: 2,
    image: "/images/rooms/deluxe.jpg",
    amenities: {
      en: ["Free WiFi", "Mini Bar", "Parking", "Breakfast Included"],
      uz: ["Bepul WiFi", "Mini bar", "Avtoturargoh", "Nonushta kiritilgan"],
      ru: ["Бесплатный WiFi", "Мини-бар", "Парковка", "Завтрак включен"],
    },
  },
  {
    id: 2,
    type: {
      en: "Standard Room",
      uz: "Standart xona",
      ru: "Стандартный номер",
    },
    description: {
      en: "Comfortable standard room with all basic amenities.",
      uz: "Barcha qulayliklarga ega qulay standart xona.",
      ru: "Уютный стандартный номер со всеми удобствами.",
    },
    price: 80,
    capacity: 2,
    image: "/images/rooms/standard.jpg",
    amenities: {
      en: ["Free WiFi", "Parking"],
      uz: ["Bepul WiFi", "Avtoturargoh"],
      ru: ["Бесплатный WiFi", "Парковка"],
    },
  },
  {
    id: 3,
    type: {
      en: "Family Suite",
      uz: "Oila uchun lyuks",
      ru: "Семейный люкс",
    },
    description: {
      en: "Large family suite with two bedrooms and kitchen.",
      uz: "Ikki yotoq xonali va oshxonaga ega katta oilaviy lyuks.",
      ru: "Большой семейный люкс с двумя спальнями и кухней.",
    },
    price: 200,
    capacity: 4,
    image: "/images/rooms/family.jpg",
    amenities: {
      en: ["Free WiFi", "Mini Bar", "Kitchen", "Parking"],
      uz: ["Bepul WiFi", "Mini bar", "Oshxona", "Avtoturargoh"],
      ru: ["Бесплатный WiFi", "Мини-бар", "Кухня", "Парковка"],
    },
  },
  {
    id: 4,
    type: {
      en: "Presidential Suite",
      uz: "Prezident lyuksi",
      ru: "Президентский люкс",
    },
    description: {
      en: "Luxury presidential suite with panoramic city view.",
      uz: "Shahar manzarasiga ega hashamatli prezident lyuksi.",
      ru: "Роскошный президентский люкс с панорамным видом на город.",
    },
    price: 500,
    capacity: 2,
    image: "/images/rooms/presidential.jpg",
    amenities: {
      en: ["Free WiFi", "Mini Bar", "Parking", "Breakfast Included", "Jacuzzi"],
      uz: ["Bepul WiFi", "Mini bar", "Avtoturargoh", "Nonushta kiritilgan", "Jakuzi"],
      ru: ["Бесплатный WiFi", "Мини-бар", "Парковка", "Завтрак включен", "Джакузи"],
    },
  },
];
