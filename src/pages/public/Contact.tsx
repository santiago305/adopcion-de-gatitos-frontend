import FormularioContacto from "@/components/Contact/FormularioContacto";
import InfoCard from "@/components/Contact/InfoCard";
import Mapa from "@/components/Contact/Mapa";
import { contactCardsData } from "./contact/indexContact"; // ✅ Importar data correctamente
import ContactoTitulo from "@/components/Contact/ContactoTitulo";

export function Contact() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ContactoTitulo />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <img
            src="/assets/aboutHome.jpeg"
            alt="Mascotas"
            className="rounded-xl w-full"
          />

          {/* Mostrar todas las tarjetas */}
          {contactCardsData.map((card, index) => (
            <InfoCard
              key={index}
              icono={card.icono}
              titulo={card.titulo}
              contenido={
                <>
                  {card.contenido.map((item, i) => {
                    if (item.type === "link") {
                      // Separar texto en etiqueta y valor
                      const [label, value] = item.text.split(": ");

                      return (
                        <p key={i} className="text-black">
                          {label && <>{label}: </>}
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 underline"
                          >
                            {value || item.text}
                          </a>
                        </p>
                      );
                    }

                    // Texto normal si no es link
                    return <p key={i}>{item.text}</p>;
                  })}
                </>
              }
            />
          ))}
        </div>

        <div className="md:col-span-2 space-y-10">
            <Mapa />
            <div
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
                style={{ backgroundColor: "rgba(247, 246, 246, 0.29)" }} 
                >
                <FormularioContacto />
                </div>
            </div>
      </div>
    </div>
  );
}

export default Contact;
