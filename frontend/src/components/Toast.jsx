import React, { useEffect, useState } from 'react';

const Toast = ({ id, message, type, duration, position, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 300); // Give time for animation to finish
    }, duration !== Infinity ? duration : 5000); // Fallback duration

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Position classes based on toast position prop
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  // Toast background color classes based on type
  const toastTypeClasses = {
    success: 'bg-green-200 border border-green-600',
    error: 'bg-red-200 border border-red-600',
    info: 'bg-blue-200 border border-blue-600',
    warning: 'bg-yellow-200 border border-yellow-600',
  };

  // Apply inline styles to control slide animation
  const toastStyles = {
    transform: visible ? 'translateY(0)' : 'translateY(500px)',
    opacity: visible ? 1 : 0,
    transition: 'transform 2s ease-out, opacity 2s ease-out',
  };

  return (
    <div
      className={` animate-pulse fixed z-50 flex items-center p-4 text-black rounded shadow-lg
        ${toastTypeClasses[type]} ${positionClasses[position]}
      `}
      style={toastStyles} // Apply custom styles here
    >
      <div className="flex-1">{message}</div>
      <button
        className="ml-4 text-2xl leading-none"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300); // Call onClose after fade-out transition
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
