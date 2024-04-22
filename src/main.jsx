import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Login from './pages/Login.jsx'
import User from './pages/User.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'

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