import { Link, Outlet, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import API from "../api/api";


const User = () => {

  const [usuario, setUsuario] = useState()
  const { id } = useParams()

  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`user/${id}`);
      setUsuario(res.data);
    };

    fetchApi();
  }, [id]);

  return (
    <div className="user-container">
        <nav>
            <h1 className="greeting">Olá, {usuario ? usuario.name : ''}</h1>
            <div className="selection-buttons">
                <Link to={`/${id}/user`} >Home</Link>
                <Link to={`/${id}/user/profile`} >Perfil</Link>
                <Link to={`/${id}/user/adicionar-artigos`} >Adicionar Artigo</Link>
                <Link to={`/${id}/user/calcs`} >IMC/BASAL</Link>
            </div>
        </nav>
        
        <main className="main-content">
            <Outlet />
        </main>

    </div>
  )
}

export default User