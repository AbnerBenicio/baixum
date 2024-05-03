import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import { Login, User, RecoverPassword, Profile, Home, Register, CreateArticle, Articles, SelectedArticle, MyArticles, Admin, ArticlesNotEvl, SelectedArticleNotEvl } from './pages';



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
        path:"/recover-password",
        element:<RecoverPassword />
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
          },
          {
            path: "/:usuarioID/user/meus-artigos",
            element: <MyArticles />
          }
        ]
      },
      {
        path:"/:usuarioID/admin",
        element:<Admin />,
        children: [
          {
            path:"/:usuarioID/admin/profile",
            element: <Profile />
          },
          {
            path:"/:usuarioID/admin/artigos",
            element: <ArticlesNotEvl />
          },
          {
            path: "/:usuarioID/admin/:artigoID",
            element: <SelectedArticleNotEvl />
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