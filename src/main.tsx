import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProvider from "@/shared/providers/QueryProvider.tsx";
import AuthProvider from "@/shared/context/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
)
