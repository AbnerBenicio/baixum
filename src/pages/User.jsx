import { Link, Outlet, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import API from "../api/api";
import '../styles/custom.css';


const User = () => {

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
    <div>
      <div className="user-container">
        {/*Navbar do usuário*/}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          {/*Links de navegação*/}
          <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <Link to={`/${usuarioID}/user`} className="nav-link">Home</Link> {/*Link para home*/}
            <Link to={`/${usuarioID}/user/perfil`} className="nav-link">Perfil</Link> {/*Link para perfil*/}
            <Link to={`/${usuarioID}/user/adicionar-artigos`} className="nav-link">Adicionar Artigo</Link> {/*Link para pagina de adicionar artigo*/}
            <Link to={`/${usuarioID}/user/artigos`} className="nav-link">Artigos</Link> {/*Link para artigos*/}
            <Link to={`/${usuarioID}/user/meus-artigos`} className="nav-link">Meus Artigos</Link> {/*Link para meus artigos*/}
            <Link to={`/`} className="nav-link" >Sair</Link> {/* Link para sair (voltar para tela de login) */}
          </div>
          {/*Saudação ao usuário*/}
          <h5 className="greeting">Olá, {usuario ? usuario.name : ''}</h5>
        </nav>
        
        {/*Conteúdo principal*/}
        <main className="main-content container-fluid">
          <Outlet /> {/*Exibindo conteúdo das páginas filhas de User*/}
        </main>

        <footer className="container-fluid fixed-bottom">
          <hr/>
          <p className="text-center mb-0">&copy; DevWeb 2024</p>
        </footer>
      </div>
    </div>
  )
}


//Exportando página
export default User