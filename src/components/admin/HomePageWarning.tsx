
import React from 'react';

const HomePageWarning: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-yellow-800">
        <strong>Note:</strong> The home page is managed through code for advanced functionality. 
        You can view its content here, but modifications should be done by editing the code directly.
      </p>
    </div>
  );
};

export default HomePageWarning;
