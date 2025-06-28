import React from 'react';

const ErrorFallback = ({ message = 'Failed to load jobs.' }) => {
  return (
    <div className="text-center py-12 text-red-600">
      <p className="text-lg font-semibold">{message}</p>
      <p className="text-sm text-red-500">Please try refreshing the page.</p>
    </div>
  );
};

export default ErrorFallback;
