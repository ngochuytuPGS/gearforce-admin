import React, { useRef, useEffect } from 'react';

interface Props {
  onConfirm: () => any;
  onCancel: () => any;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

const ConfirmModal = ({ onConfirm, onCancel, title, message, confirmButtonText, cancelButtonText }: Props) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-transparent-300 fixed z-[1000] top-0 left-0 flex justify-center items-center w-screen h-screen">
      <div className="bg-color-primary w-1/3 min-w-[300px] border rounded-md border-color-border [&>*]:py-4 [&>*]:px-5 [&>*]:border-b [&>*]:border-color-border">
        <h1 className="font-bold">{title}</h1>
        <p>{message}</p>
        <div className="flex justify-between items-center">
          <button className="button-primary" onClick={onConfirm}>
            {confirmButtonText}
          </button>
          <button className="button-primary bg-red-500" onClick={onCancel} ref={cancelButtonRef}>
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
