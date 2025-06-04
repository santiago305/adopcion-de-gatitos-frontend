import * as React from "react";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import NavSection from "./NavSection";
import { headerLinks} from "@/Router/config/routesConfig";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { Link} from "react-router-dom";
import ShimmerLoader from "./loadings.tsx/ShimmerLoader";
import { Suspense } from "react";
import { RoutesPaths } from "@/router/config/routesPaths";


export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar className="" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/*<NavSection links={headerLinks} />*/}
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to={RoutesPaths.dashboard} className="flex items-center gap-2">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Huellitas Felices</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* <SidebarContent>
        <Suspense fallback={<div className="w-full h-full"><ShimmerLoader/></div>}>
          <NavMain items={data.navMain} />
          <NavDocuments items={data.documents} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </Suspense>
      </SidebarContent> */}

      <SidebarFooter >
        <Suspense fallback={<div className="w-full h-[50px]"><ShimmerLoader /></div>}>
          <NavSection links={headerLinks} />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
