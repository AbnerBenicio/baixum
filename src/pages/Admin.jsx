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
    <div className="user-container">
      {/* Navbar do usuário */}
      <nav>
        {/* Saudação ao usuário */}
        <h1 className="greeting">Olá, {usuario ? usuario.name : ''}</h1>
        {/* Links de navegação */}
        <div className="selection-buttons">
          <Link to={`/${usuarioID}/admin`} >Home</Link> {/* Link para home */}
          <Link to={`/${usuarioID}/admin/profile`} >Perfil</Link> {/* Link para perfil */}
          <Link to={`/${usuarioID}/admin/artigos`} >Artigos Para Validacao</Link> {/* Link para artigos */}
          <Link to={`/`} >Sair</Link> {/* Link para sair (voltar para tela de login) */}
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="main-content">
        <Outlet /> {/* Exibindo conteúdo das páginas filhas de Admin */}
      </main>

      {/* Footer */}
      <footer className="container fixed-bottom">
        <hr />
        <p>&copy; DevWeb 2024</p>
      </footer>
    </div>
  )
}

//Exportando página
export default Admin