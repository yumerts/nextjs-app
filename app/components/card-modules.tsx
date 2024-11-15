import React from 'react';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-gray-100 px-4 py-3 border-b ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={`text-lg font-medium text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div
      className={`px-4 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-gray-100 px-4 py-3 border-t ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};