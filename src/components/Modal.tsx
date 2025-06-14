import { ReactNode } from "react";
import { getRelativeTime } from "@/common/utils/dateRelative";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, string | number | boolean>; 
  fieldLabels?: Record<string, string>;
  hiddenFields?: string[];
  children?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  data,
  fieldLabels = {},
  hiddenFields = [],
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatValue = (key: string, value: string | number | boolean) => {
    if (typeof value === "boolean") {
      return value ? "Sí" : "No"; // ✅ Mostrar Sí/No en lugar de true/false
    }

    if (typeof value === "string" && key.toLowerCase().includes("at")) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return getRelativeTime(value); // ✅ Ej. "hace 3 horas"
      }
    }

    return String(value);
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
          className="text-gray-600 hover:text-gray-900 absolute top-4 left-4"
        >
          X
        </button>

        {children && <div className="mb-4">{children}</div>}

        <h2 className="text-xl font-semibold mb-4">Detalles</h2>
        <div className="space-y-4">
          {Object.entries(data).map(([key, value], index) => {
            if (hiddenFields.includes(key)) return null;
            const label =
              fieldLabels[key] ||
              fieldLabels[key.toLowerCase()] ||
              key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <div key={index}>
                <strong>{label}:</strong> {formatValue(key, value)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
