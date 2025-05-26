import React from "react";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {}

const LogoIcon: React.FC<LogoIconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1025.68 565.68"
      fill="currentColor"
      className={cn(className)}
      {...props}
    >
      <g data-name="Capa 1">
        <path d="M1025.68,282.84l-282.84,282.84-53.41-53.41-123.17-123.17c-14.14-14.84-28.28-29.67-42.42-44.51,17.67-17.33,35.33-34.67,53-52,55.33,55.68,110.67,111.35,166,167.03l98.8-98.79,77.98-77.99-176.78-176.78-77.98,77.99-98.8,98.79,.09,.09c-17.74,17.63-35.48,35.24-53.22,52.84l-.09-.09-26.38,26.38c-17.26,17.14-34.53,34.28-51.79,51.42l.19,.19-53.04,53.03-98.98,98.98L0,282.84,282.84,0l222,221.59c-17.67,17-35.33,34-53,51-15.4-14.57-30.79-29.15-46.19-43.72l-122.81-122.81L106.06,282.84l176.78,176.78,45.95-45.95,130.83-130.83-.19-.19,53.03-53.03c33.12-32.87,66.25-65.73,99.37-98.6L742.84,0l282.84,282.84Z" />
      </g>
    </svg>
  );
};

export default LogoIcon;
