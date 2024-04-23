import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import { Login, User, Profile, Home, Register, CreateArticle, Articles } from './pages';


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
        path:"/:id/user",
        element:<User />,
        children: [
          {
            path: "/:id/user",
            element: <Home />
          },
          {
            path: "/:id/user/profile",
            element: <Profile />
          },
          {
            path: "/:id/user/adicionar-artigos",
            element: <CreateArticle />
          },
          {
            path: "/:id/user/artigos",
            element: <Articles />
          },
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