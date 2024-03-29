// Modal.js
import React from 'react';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, closeModal, title, children } : Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 max-w-sm mx-auto">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={closeModal} className="text-lg font-bold">&times;</button>
        </header>
        <div className="my-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
