import { FlashMessageRoot } from './components/flashMessage/FlashMessageRoot'
import { AuthProvider } from './context/AuthProvider'
import { FlashMessageProvider } from './context/FlashMessageProvider'
import './globals.css'
import AppRouter from "./router/AppRouter"
/**
 * Componente raíz de la aplicación.
 * 
 * Este componente configura los providers globales de la aplicación:
 * - AuthProvider: Proporciona el contexto de autenticación.
 * - FlashMessageProvider: Gestiona los mensajes flash (notificaciones).
 * - FlashMessageRoot: Componente visual que muestra los mensajes flash.
 * 
 * También inicializa las rutas principales mediante AppRouter.
 * 
 * @returns {JSX.Element} La estructura principal de la aplicación.
 */
function App() {
  return (
    <AuthProvider>
      <FlashMessageProvider>
        <FlashMessageRoot />
        <AppRouter />
      </FlashMessageProvider>
    </AuthProvider>
  )
}

export default App;
