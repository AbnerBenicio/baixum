import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/custom.css";

const User = () => {
  //Definindo variáveis
  const [usuario, setUsuario] = useState();
  const { usuarioID } = useParams();

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
      <nav className="navbar d-flex flex-column navbar-expand navbar-light bg-light fixed-top z-index-10">
        {/* Links de navegação */}
        <div className="d-flex gap-4" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={`/${usuarioID}/user`} className="nav-link">
                Home
              </Link>
              {/* Link para home */}
            </li>
            <li className="nav-item">
              <Link to={`/${usuarioID}/user/perfil`} className="nav-link">
                Perfil
              </Link>{" "}
              {/* Link para perfil */}
            </li>
            <li className="nav-item">
              <Link
                to={`/${usuarioID}/user/adicionar-artigos`}
                className="nav-link"
              >
                Adicionar Artigo
              </Link>{" "}
              {/* Link para página de adicionar artigo */}
            </li>
            <li className="nav-item">
              <Link to={`/${usuarioID}/user/artigos`} className="nav-link">
                Artigos
              </Link>{" "}
              {/* Link para artigos */}
            </li>
            <li className="nav-item">
              <Link
                to={`/${usuarioID}/user/meus-artigos`}
                className="nav-link"
              >
                Meus Artigos
              </Link>{" "}
              {/* Link para meus artigos */}
            </li>
            <li className="nav-item">
              <Link to={`/`} className="nav-link">
                Sair
              </Link>{" "}
              {/* Link para sair (voltar para tela de login) */}
            </li>
          </ul>
        </div>
        {/* Saudação ao usuário */}
        <div className="navbar-text">
          <span className="greeting">Olá, {usuario ? usuario.name : ""}</span>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="d-flex justify-content-center align-items-center flex-grow-1 z-index-0" style={{ width: "100%" }}>
        <Outlet /> {/* Exibindo conteúdo das páginas filhas de User */}
      </main>
    </div>
  );
};

//Exportando página
export default User;
