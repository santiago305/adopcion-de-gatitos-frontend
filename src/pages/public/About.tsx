import SidebarSticky from "@/components/SidebarSticky";

 export default function About() {
  return (
    <div className="relative flex  min-h-screen">

      <SidebarSticky imageSrc="/assets/perritoabout.png" imageAlt="MIAUU" />

      <div className="relative w-3/5 bg-amber-500 p-4 z-20">
        <div className="h-[200vh]">
          <p>Contenido extenso que genera scroll...</p>
        </div>
      </div>
      <SidebarSticky imageSrc="/assets/gatitoabout.png" imageAlt="MIAUU" />


    </div>
  );
} 