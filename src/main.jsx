import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './pages/Login.jsx'
import User from './pages/User.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import RecoverPassword from './pages/RecoverPassword.jsx'
import CreateArticle from './pages/CreateArticle.jsx'
import Articles from './pages/Articles.jsx'
import SelectedArticle from './pages/SelectedArticle.jsx'
import MyArticles from './pages/MyArticles.jsx'
import SelectedMyArticle from './pages/SelectedMyArticle.jsx'
import Admin from './pages/Admin.jsx'
import ArticlesNotEvl from './pages/ArticlesNotEvl.jsx'
import SelectedArticleNotEvl from './pages/SelectedArticleNotEvl.jsx'



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
            path: "/:usuarioID/user/perfil",
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
          },
          {
            path: "/:usuarioID/user/meus-artigos/:artigoID",
            element: <SelectedMyArticle />
          }
        ]
      },
      {
        path:"/:usuarioID/admin",
        element:<Admin />,
        children: [
          {
            path: "/:usuarioID/admin",
            element: <Home />
          },
          {
            path:"/:usuarioID/admin/perfil",
            element: <Profile />
          },
          {
            path:"/:usuarioID/admin/artigos",
            element: <ArticlesNotEvl />
          },
          {
            path: "/:usuarioID/admin/artigos/:artigoID",
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