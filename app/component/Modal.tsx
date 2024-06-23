// components/Modal.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onPlayAgain: () => void;
  onHome: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, onPlayAgain, onHome }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <p className="mb-4 text-2xl">{message}</p>
        <button
          onClick={onPlayAgain}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Play Again
        </button>
        <button
          onClick={onHome}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Modal;
