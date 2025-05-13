
import { ComponentType } from "react";

export interface RouteConfig {
  path: string;
  name: string;
  component: ComponentType;
  layout?: ComponentType<{ children:  React.ReactElement }>
  guard?: ComponentType<{ children:  React.ReactElement }>;
  children?: RouteConfig[]; // NUEVO: Rutas hijas anidadas
  roles?: string[]; // Si en el futuro agregas control de roles
}
