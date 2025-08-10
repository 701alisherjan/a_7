import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  count = 1, 
  height = 'h-4', 
  className = '' 
}) => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse ${height} ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          } rounded-lg ${className}`}
        />
      ))}
    </>
  );
};

export const HotelCardSkeleton: React.FC = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <SkeletonLoader height="h-64" className="rounded-none" />
      <div className="p-6 space-y-4">
        <SkeletonLoader height="h-6" className="w-3/4" />
        <SkeletonLoader height="h-4" className="w-full" />
        <SkeletonLoader height="h-4" className="w-2/3" />
        <div className="flex justify-between items-center">
          <SkeletonLoader height="h-4" className="w-1/4" />
          <SkeletonLoader height="h-10" className="w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;