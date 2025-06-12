import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, string | number>;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, data, children }: ModalProps) {
  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 absolute top-4 right-4"
        >
          X
        </button>

        {/* Botones u otros elementos opcionales */}
        {children && <div className="mb-4">{children}</div>}

        <h2 className="text-xl font-semibold mb-4">Detalles</h2>
        <div className="space-y-4">
          {Object.entries(data).map(([key, value], index) => (
            <div key={index}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
