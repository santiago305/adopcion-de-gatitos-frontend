import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <Link to="/" className="text-2xl font-bold text-primary transition-transform duration-500 hover:scale-105">
      MyBrand
    </Link>
  );
}
