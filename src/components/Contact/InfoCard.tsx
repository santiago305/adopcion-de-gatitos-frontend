import { ReactNode } from "react";

interface InfoCardProps {
  icono: string;
  titulo: string;
  contenido: ReactNode;
}

const InfoCard = ({ icono, titulo, contenido }: InfoCardProps) => {
  return (
    <div className="bg-pink-100 p-4 rounded-xl mb-4">
      <h3 className="text-pink-700 font-semibold text-lg mb-2">
        {icono} {titulo}
      </h3>
      <div>{contenido}</div>
    </div>
  );
};

export default InfoCard;
