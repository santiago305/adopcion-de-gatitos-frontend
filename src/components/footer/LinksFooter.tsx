import { Globe, Mail, PhoneCall } from 'lucide-react';
import { AiFillFacebook, AiFillTikTok, AiOutlineInstagram } from 'react-icons/ai';

export const LinksNav1 = [
  {
    icon: <PhoneCall className="w-6 h-6" />,
    label: "962696946",
    to: "https://wa.me/51962696946",
    external: true,
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "minecratf633@gmail.com",
    to: "https://mail.google.com/mail/?view=cm&fs=1&to=minecratf633@gmail.com&su=Hola&body=Quiero%20hablar%20contigo",
    external: true,
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: "Calle La Libertad 508, Piura",
    to: "https://maps.app.goo.gl/nysuFire5sUdbqDn6",
    external: true, 
  }
];

export const LinksNetworks = [
  {
    icon: <AiFillFacebook className="w-8 h-8" />,
    label: "Facebook",
    to: "https://www.facebook.com/",
    external: true,
  },
  {
    icon: <AiOutlineInstagram className="w-8 h-8" />,
    label: "instagram",
    to: "https://www.instagram.com/",
    external: true,
  },
  {
    icon: <AiFillTikTok className="w-8 h-8" />,
    label: "Tiktok",
    to: "https://www.tiktok.com/",
    external: true, 
  }
];