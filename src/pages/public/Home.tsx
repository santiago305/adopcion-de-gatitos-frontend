import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";
import IndexHome from "./home/IndexHome";
import AboutHome from "./home/AboutHome";



export default function Home() {
  useLocationFlashMessage();
    return (
      <>
        <IndexHome />

        <AboutHome /> 
      </> 
    );
}
