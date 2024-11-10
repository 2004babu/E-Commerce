import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700 text-center">
      <h1 className="text-8xl font-extrabold text-red-500 animate-bounce">404</h1>
      <p className="text-2xl mt-4 font-semibold animate-fadeIn">Page Not Found</p>
      <p className="text-lg mt-2 text-gray-500 animate-fadeIn">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
