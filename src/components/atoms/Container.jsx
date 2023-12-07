import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="sm:max-w-[600px] md:max-w-[940px] lg:max-w-[1252px] mx-auto p-4">
      {children}
    </div>
  );
};

export default Container