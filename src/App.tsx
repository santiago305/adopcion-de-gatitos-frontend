import { FlashMessageRoot } from './components/flashMessage/FlashMessageRoot'
import { FlashMessageProvider } from './context/FlashMessageContext'
import './globals.css'
import AppRouter from "./router/AppRouter"
function App() {
  return (
    <FlashMessageProvider>
      <FlashMessageRoot />
      <AppRouter />
    </FlashMessageProvider>
  )
}

export default App
