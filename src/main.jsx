import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// react router dom
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './provider/AuthProvider';
// tanstack query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-[1400px] mx-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
