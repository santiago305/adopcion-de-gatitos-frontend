import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4">
      <div className="max-w-[1200px] m-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        {/* Logo o Marca */}
        <div className="text-lg font-semibold">
          © {new Date().getFullYear()} MyBrand
        </div>

        {/* Redes Sociales */}
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
