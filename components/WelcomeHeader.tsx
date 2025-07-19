import React from 'react';

interface WelcomeHeaderProps {
  name: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ name }) => {
  // Get time of day to personalize greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 transition-all duration-300">
        {getGreeting()} <span className="text-blue-600">{name}</span>
      </h1>
      <p className="text-gray-600">
        Welcome to your profile page. Here you can view and edit your personal information.
      </p>
    </div>
  );
};

export default WelcomeHeader;