import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { setLanguage } from '../../store/slices/languageSlice';
import { toggleDarkMode } from '../../store/slices/themeSlice';
import { Moon, Sun, Globe, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLanguageChange = (lang: 'en' | 'uz' | 'ru') => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/rooms', label: t('hotels') },
    { path: '/complaints', label: t('complaints') },
    ...(isAuthenticated ? [{ path: '/profile', label: t('profile') }] : []),
  ];

  const getThemeClasses = () => {
    if (isDarkMode) {
      return 'bg-gray-900/95 border-gray-700';
    }
    return 'bg-white/95 border-white/20';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${getThemeClasses()} transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Jizzakh Hotels
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-amber-500'
                    : isDarkMode
                    ? 'text-gray-200 hover:text-amber-400'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-amber-500/10 rounded-lg"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Globe className="h-5 w-5" />
              </button>
              <div className={`absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
                {['en', 'uz', 'ru'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang as 'en' | 'uz' | 'ru')}
                    className={`w-full px-4 py-2 text-left hover:bg-amber-500/10 ${
                      currentLanguage === lang ? 'text-amber-500' : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    {lang === 'en' ? 'English' : lang === 'uz' ? 'O\'zbek' : 'Русский'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Profile */}
            <Link
              to="/profile"
              className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;