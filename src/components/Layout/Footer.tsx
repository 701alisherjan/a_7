import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { MapPin, Phone, Mail, Cloud } from 'lucide-react';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Simulate weather API call (replace with actual API)
    const fetchWeather = async () => {
      try {
        // Mock weather data for Jizzakh
        setWeather({
          temperature: 22,
          description: 'Clear sky',
          humidity: 45
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
  }, []);

  const getThemeClasses = () => {
    if (isDarkMode) {
      return 'bg-gray-900 text-gray-200 border-gray-700';
    }
    return 'bg-gray-50 text-gray-800 border-gray-200';
  };

  return (
    <footer className={`${getThemeClasses()} border-t py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Jizzakh Hotels</h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Experience luxury hospitality in the heart of Uzbekistan's beautiful Jizzakh region.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-amber-500" />
              <span>Jizzakh, Uzbekistan</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>+998 70 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>info@jizzakhhotels.com</span>
              </div>
            </div>
          </div>

          {/* Weather */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('weather')}</h3>
            {weather ? (
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Cloud className="h-4 w-4 text-amber-500" />
                  <span>{weather.temperature}°C</span>
                </div>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {weather.description}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Humidity: {weather.humidity}%
                </p>
              </div>
            ) : (
              <div className="text-sm">Loading weather...</div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="/hotels" className="block hover:text-amber-500 transition-colors">
                {t('hotels')}
              </a>
              <a href="/complaints" className="block hover:text-amber-500 transition-colors">
                {t('complaints')}
              </a>
              <a href="/profile" className="block hover:text-amber-500 transition-colors">
                {t('profile')}
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; 2024 Jizzakh Hotels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;