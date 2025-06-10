import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";


export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div
      className={open ? "w-64" : "w-18"}>
      </div>
      <aside
        className={`bg-white shadow-md h-screen fixed top-0 left-0 transition-all duration-300 z-50 ${
          open ? "w-64" : "w-18 flex flex-col items-center"
        }`}
      >
        <SidebarHeader open={open} toggle={() => setOpen(!open)} />
        <SidebarMenu open={open} />
        <SidebarFooter open={open} />
      </aside>
    </>
  );
}
