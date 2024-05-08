import { Link, Outlet, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import API from "../api/api";


const Admin = () => {

  //Definindo variáveis
  const [usuario, setUsuario] = useState()
  const { usuarioID } = useParams()

  //Buscando usuário logado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`user/${usuarioID}`);
      setUsuario(res.data);
    };

    fetchApi();
  }, [usuarioID]);

  //Retornando página
  return (
    <div className="user-container d-flex flex-column align-items-center">
      {/* Navbar do usuário */}
      <nav className="navbar d-flex flex-column navbar-expand navbar-light bg-light fixed-top">
        {/* Links de navegação */}
        <div className="d-flex gap-4">
          <Link to={`/${usuarioID}/admin`} className="nav-link">Home</Link> {/* Link para home */}
          <Link to={`/${usuarioID}/admin/perfil`} className="nav-link">Perfil</Link> {/* Link para perfil */}
          <Link to={`/${usuarioID}/admin/artigos`} className="nav-link">Artigos Para Validacao</Link> {/* Link para artigos */}
          <Link to={`/`} className="nav-link">Sair</Link> {/* Link para sair (voltar para tela de login) */}
        </div>
        {/* Saudação ao usuário */}
        <h5 className="greeting">Olá, {usuario ? usuario.name : ''}</h5>
      </nav>

      {/* Conteúdo principal */}
      <main className="d-flex justify-content-center align-items-center flex-grow-1 z-index-0">
        <Outlet /> {/* Exibindo conteúdo das páginas filhas de Admin */}
      </main>
    </div>
  )
}

//Exportando página
export default Admin