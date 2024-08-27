import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Sorting from './Home/Sorting/Sorting.jsx'
import Graph from './Home/Graph/Graph.jsx'
import PathFinder from './Home/PathFinder/PathFinder.jsx'


const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path:'',
        element: <Home />,
      },
      {
        path: '/sort',
        element: <Sorting />
      },
      {
        path: '/graph',
        element: <Graph />
      },
      {
        path: '/path',
        element: <PathFinder />
      }
    ] 
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
