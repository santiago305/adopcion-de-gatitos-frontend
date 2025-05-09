import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

import { IconInnerShadowTop } from "@tabler/icons-react"
import { useEffect, useState } from "react"




export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userRole } = useAuth(); 
  const [data, setData] = useState<any>(null);


  useEffect(() => {
    if (userRole === "user") {
      import("@/pages/dashboard/app-dashboard/user-data").then((mod) => {
        setData(mod.userData);
      });
    } else if (userRole === "admin") {
      import("@/pages/dashboard/app-dashboard/admin-data").then((mod) => {
        setData(mod.adminData);
      });
    }
  }, [userRole]);



  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
