import { Heart, Home, Leaf, PawPrint, Smile, Thermometer } from "lucide-react"; 
import { FaBeer } from "react-icons/fa"; 
import { RouteMetadata } from "@/types/RouterTypes";
import { RoutesPaths } from "./routesPaths";

export const headerLinks: RouteMetadata[] = [
  { 
    path: RoutesPaths.dashboard, 
    name: "Dashboard", 
    isProtected: true, 
    roles: ["admin", "moderator"],
    icon: Home 
  },

  { 
    path: RoutesPaths.dashboardAnimals, 
    name: "Animales", 
    isProtected: true, 
    roles: ["admin", "moderator"], 
    icon: PawPrint, 
  },

  { 
    path: RoutesPaths.dashboardDiseases, 
    name: "Enfermedades", 
    isProtected: true, 
    roles: ["admin", "moderator"], 
    icon: Thermometer, 
  },

  { 
    path: RoutesPaths.dashboardSpecies, 
    name: "Especies", 
    isProtected: true, 
    roles: ["admin", "moderator"], 
    icon: Leaf,  
  },

  { 
    path: RoutesPaths.dashboardBreed, 
    name: "Razas", 
    isProtected: true, 
    roles: ["admin", "moderator"], 
    icon: FaBeer,  
  },

  { 
    path: RoutesPaths.dashboardCharacteristics, 
    name: "Caracteristicas", 
    isProtected: true, 
    roles: ["admin", "moderator"], 
    icon: Heart, 
  },


  { 
    path: RoutesPaths.dashboardPersonality, 
    name: "Personalidades", 
    isProtected: true, 
    roles: ["admin", "moderator"], 
    icon: Smile,  
  },
];

    // { path: RoutesPaths.adopcionList, name: "Adopcion", isPublic: true, icon: Home,
    //   subItems: [
    //     { path: RoutesPaths.adopcionList, name: "Historial de Adopciones", isPublic: true },
    //     { path: RoutesPaths.adopcionSolicitar, name: "Solicitar adopción", isPublic: true },
    //     { path: RoutesPaths.adopcionVersolicutud, name: "Ver Solicitudes", isPublic: true },
    //     { path: RoutesPaths.adopcionEvaluar, name: "Evaluar Solicitudes", isPublic: true },
    //     { path: RoutesPaths.adopcionAprobarRechazar, name: "Aprobar/Rechazar", isPublic: true },
    //     { path: RoutesPaths.adopcionExportar, name: "Exportar Solicitudes", isPublic: true },
    //   ],
    // },
  
    // {
    //   path: RoutesPaths.usersList, name: "Usuarios", isProtected: true, icon: User,
    //   subItems: [
    //     { path: RoutesPaths.usersList, name: "Lista Usuarios", isProtected: true},
    //     { path: RoutesPaths.usersRegister, name: "Registrar Usuarios", isProtected: true},
    //   ],
    // },