import React, { useEffect } from 'react';
import { FaCheck, FaInfoCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  onClose,
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck className="h-5 w-5" />;
      case 'error':
        return <FaExclamationCircle className="h-5 w-5" />;
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5" />;
      case 'info':
      default:
        return <FaInfoCircle className="h-5 w-5" />;
    }
  };

  const getToastClasses = () => {
    const baseClasses = "fixed bottom-4 right-4 z-50 flex items-center shadow-lg rounded-lg py-2 px-4 transition-all duration-300";
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-600 text-white`;
      case 'error':
        return `${baseClasses} bg-red-600 text-white`;
      case 'warning':
        return `${baseClasses} bg-amber-500 text-white`;
      case 'info':
      default:
        return `${baseClasses} bg-blue-600 text-white`;
    }
  };

  return (
    <div className={getToastClasses()}>
      <span className="mr-2">
        {getToastIcon()}
      </span>
      <span className="flex-1">{message}</span>
      <button 
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors focus:outline-none"
        aria-label="Close notification"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default Toast;

// Add this to your global CSS
/*
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
*/ 