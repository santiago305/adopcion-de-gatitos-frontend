import { headerLinks } from "@/Router/config/routesConfig";
import { useAuth } from "@/hooks/useAuth";
import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";

export default function SidebarMenu({ open }: { open: boolean }) {
  const { userRole } = useAuth();

  return (
    <div className="mt-2 flex flex-col gap-1">
      {headerLinks
        .filter((link) => !link.roles || link.roles.includes(userRole || ""))
        .map((link) =>
          link.subItems ? (
            <SidebarGroup key={link.path} link={link} open={open} />
          ) : (
            <SidebarItem key={link.path} link={link} open={open} />
          )
        )}
    </div>
  );
}
