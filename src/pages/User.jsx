import { Link, Outlet, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import API from "../api/api";


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
    <div className="user-container">
        {/*Navbar do usuário*/}
        <nav>
          {/*Saudação ao usuário*/}
            <h1 className="greeting">Olá, {usuario ? usuario.name : ''}</h1>
            {/*Links de navegação*/}
            <div className="selection-buttons">
                <Link to={`/${usuarioID}/user`} >Home</Link> {/*Link para home*/}
                <Link to={`/${usuarioID}/user/profile`} >Perfil</Link> {/*Link para perfil*/}
                <Link to={`/${usuarioID}/user/adicionar-artigos`} >Adicionar Artigo</Link> {/*Link para pagina de adicionar artigo*/}
                <Link to={`/${usuarioID}/user/artigos`} >Artigos</Link> {/*Link para artigos*/}
                <Link to={`/${usuarioID}/user/meus-artigos`} >Meus Artigos</Link> {/*Link para meus artigos*/}
                <Link to={`/`} >Sair</Link> {/*Link para sair (voltar para tela de login)*/}
            </div>
        </nav>
        
        {/*Conteúdo principal*/}
        <main className="main-content">
            <Outlet /> {/*Exibindo conteúdo das páginas filhas de User*/}
        </main>

    </div>
  )
}

//Exportando página
export default User