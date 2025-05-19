import { Link } from "react-router-dom";
import LogoIcon from "../SVG/LogoIcon";
import { RoutesPaths } from "@/router/config/routesPaths";

export default function HeaderLogo() {
  return (
    <Link to={RoutesPaths.home} className="w-[70px] font-bold text-primary transition-transform duration-500 hover:scale-105">
      <LogoIcon 
      className="w-full"
      />
    </Link>
  );
}
