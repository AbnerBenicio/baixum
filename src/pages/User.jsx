import { Link, Outlet, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import API from "../api/api";


const User = () => {

  const [usuario, setUsuario] = useState()
  const { usuarioID } = useParams()

  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`user/${usuarioID}`);
      setUsuario(res.data);
    };

    fetchApi();
  }, [usuarioID]);

  return (
    <div className="user-container">
        <nav>
            <h1 className="greeting">Olá, {usuario ? usuario.name : ''}</h1>
            <div className="selection-buttons">
                <Link to={`/${usuarioID}/user`} >Home</Link>
                <Link to={`/${usuarioID}/user/profile`} >Perfil</Link>
                <Link to={`/${usuarioID}/user/adicionar-artigos`} >Adicionar Artigo</Link>
                <Link to={`/${usuarioID}/user/artigos`} >Artigos</Link>
            </div>
        </nav>
        
        <main className="main-content">
            <Outlet />
        </main>

    </div>
  )
}

export default User