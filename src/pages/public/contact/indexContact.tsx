interface CardItem {
  text: string;
  type?: "link";
  href?: string;
}

interface ContactCard {
  icono: string;
  titulo: string;
  contenido: CardItem[];
}

export const contactCardsData: ContactCard[] = [
  {
    icono: "📍",
    titulo: "Nuestra Ubicación",
    contenido: [
      { text: "Av. Los Girasoles 123, Piura, Piura, Perú" },
      { text: "Estamos cerca del Parque Principal." }
    ]
  },
  {
    icono: "🕒",
    titulo: "Horario de Atención",
    contenido: [
      { text: "Lunes a Viernes: 10:00 AM - 6:00 PM" },
      { text: "Sábados y Domingos: 11:00 AM - 3:00 PM (Previa cita)" }
    ]
  },
  {
    icono: "📞",
    titulo: "Contáctanos Directamente",
    contenido: [
      {
        text: "Teléfono: 971818945",
        type: "link",
        href: "https://api.whatsapp.com/send/?phone=971818945&text=Hola%21+Estoy+interesado+en+adoptar+una+mascota&type=phone_number&app_absent=0"
      },
      {
        text: "Correo electrónico: adopciones@huellitasfelices.org",
        type: "link",
        href: "mailto:adopciones@huellitasfelices.org"
      }
    ]
  }
];
