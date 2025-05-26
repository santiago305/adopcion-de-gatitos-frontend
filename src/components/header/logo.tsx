import { Link } from "react-router-dom";
import LogoIcon from "../SVG/LogoIcon";
import { RoutesPaths } from "@/router/config/routesPaths";
import clsx from "clsx";

interface HeaderLogoProps {
  className?: string;
}

export default function Logo({ className }:HeaderLogoProps) {
  return (
    <Link 
    to={RoutesPaths.home} 
    className={clsx("inline-block font-bold transition-transform duration-500 hover:scale-105", className)}
    >
      <LogoIcon 
      className="w-full h-full"
      />
    </Link>
  );
}
