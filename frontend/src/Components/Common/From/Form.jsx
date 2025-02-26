import React, { useEffect, useRef } from "react";

const Form = ({ isOpen, onClose, children }) => {
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div
        ref={formRef}
        className='bg-light dark:bg-dark p-8 rounded-lg shadow-lg relative max-w-3xl w-full'
      >
        {children}
      </div>
    </div>
  );
};

export default Form;