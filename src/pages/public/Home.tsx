import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";
import IndexHome from "./home/IndexHome";
import AboutHome from "./home/AboutHome";



export default function Home() {
  useLocationFlashMessage();
    return (
      <>
        <IndexHome />

        <AboutHome /> 
        <img
          src="http://localhost:3000/uploads/animals/1749748579599.jpg"
          alt="Animal"
          className="h-32 w-32 object-cover rounded"
        />


      </> 
    );
}
