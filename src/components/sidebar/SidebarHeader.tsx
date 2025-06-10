import { PanelLeftIcon } from "lucide-react";

export default function SidebarHeader({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {open && <h1 className="text-sm font-bold">Huellitas Felices</h1>}
      <button onClick={toggle} className="p-1">
        <PanelLeftIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
