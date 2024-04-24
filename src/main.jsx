import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import { Login, User, Profile, Home, Register, CreateArticle, Articles, SelectedArticle } from './pages';



const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<Login />
      },
      {
        path:"/register",
        element:<Register />
      },
      {
        path:"/:usuarioID/user",
        element:<User />,
        children: [
          {
            path: "/:usuarioID/user",
            element: <Home />
          },
          {
            path: "/:usuarioID/user/profile",
            element: <Profile />
          },
          {
            path: "/:usuarioID/user/adicionar-artigos",
            element: <CreateArticle />
          },
          {
            path: "/:usuarioID/user/artigos",
            element: <Articles />,
          },
          {
            path: "/:usuarioID/user/artigos/:artigoID",
            element: <SelectedArticle />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)