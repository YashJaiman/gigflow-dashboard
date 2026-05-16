import React from 'react';
import { useToast } from '../hooks/useToast';

export const Toast: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg text-white shadow-lg animate-fade-in ${
            {
              success: 'bg-green-500',
              error: 'bg-red-500',
              info: 'bg-blue-500',
              warning: 'bg-yellow-500',
            }[toast.type]
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
