import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";
import IndexHome from "./home/IndexHome";



export default function Home() {
  useLocationFlashMessage();
    return (
      <>
        <IndexHome />
      </> 
    );
}
