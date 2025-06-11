import { LucideIcon } from 'lucide-react'; 
import { IconType } from 'react-icons';
import { IconProps, TablerIcon } from '@tabler/icons-react';
import { ReactElement } from 'react';

export interface RouteMetadata {
  path: string;
  name: string;
  icon?: LucideIcon | IconProps | TablerIcon | IconType | ReactElement; // Acepta JSX.Element como tipo para los componentes
  isPublic?: boolean;
  isAuthRoute?: boolean;
  isProtected?: boolean;
  requiresClientRegister?: boolean;
  roles?: string[];
  showInNavigation?: boolean;
  subItems?: Omit<RouteMetadata, 'icon' | 'subItems'>[];
}
