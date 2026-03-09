import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/routes';
import './styles.css';
import { AuthProvider } from './providers/auth.provide';


const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);