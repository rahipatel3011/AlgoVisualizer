import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Sorting from './Home/Sorting/Sorting.jsx'


const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path:'',
        element: <Home />,
      },
      {
        path: '/sorting',
        element: <Sorting />
      }
    ] 
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
