import { Outlet} from "react-router-dom";
import { Suspense,lazy } from "react";

const AppSidebar = lazy(() => import("@/components/app-sidebar"));
const SiteHeader = lazy(() => import("@/components/site-header"));
const SidebarInset = lazy(() =>
  import("@/components/ui/sidebar").then((module) => ({
    default: module.SidebarInset,
  }))
);

const SidebarProvider = lazy(() =>
  import("@/components/ui/sidebar").then((module) => ({
    default: module.SidebarProvider,
  }))
);

export default function DashboardLayout() {
  return (
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}