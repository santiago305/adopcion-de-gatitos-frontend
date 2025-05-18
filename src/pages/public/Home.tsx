
import Layout from "@/components/layout/layout";
import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";



export default function Home() {
  useLocationFlashMessage();
    return (
        <Layout>
          hola 
        </Layout>
    );
}
