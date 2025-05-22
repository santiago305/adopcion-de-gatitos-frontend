import * as React from "react";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import NavSection from "./NavSection";
import { headerLinks } from "@/Router/config/routesConfig";


export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavSection links={headerLinks} />
            {/* <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to={}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LAPIN</span>
              </Link>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* <SidebarContent>
        <Suspense fallback={<div className="w-full h-full"><ShimmerLoader/></div>}>
          <NavMain items={data.navMain} />
          <NavDocuments items={data.documents} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </Suspense>
      </SidebarContent>

      <SidebarFooter>
        <Suspense fallback={<div className="w-full h-[50px]"><ShimmerLoader/></div>}>
          <NavUser user={data.user} />
        </Suspense>
      </SidebarFooter> */}
    </Sidebar>
  );
}
