import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.tsx'
import { Suspense } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <Suspense fallback={<>cargando aplicacion</>}>
        <RouterProvider router={router} />
      </Suspense>
    </App>
  </StrictMode>,
)
