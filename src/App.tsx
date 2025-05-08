import { FlashMessageRoot } from './components/flashMessage/FlashMessageRoot'
import { AuthProvider } from './context/AuthProvider'
import { FlashMessageProvider } from './context/FlashMessageContext'
import './globals.css'
import AppRouter from "./router/AppRouter"
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

export default App
