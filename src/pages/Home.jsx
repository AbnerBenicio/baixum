import { useEffect, useState } from 'react';
import '../styles/custom.css';
import { useParams } from 'react-router-dom';
import HomeUser from '../components/HomeUser';
import API from "../api/api"

const Home = () => {

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

  console.log(usuario)

  

  // Retornando página
  return (
    <div>
      <div className="jumbotron bg-light">
        <div className="container-fluid text-center">
          <h1 className="display-3">Baixum</h1>
          <p>O seu site de artigos, para compartilhar e aumentar o seu conhecimento</p>
        </div>
      </div>

      <div className="container">
        {usuario && <HomeUser usuarioID={usuarioID} userAdm={usuario.adm}/>}
      </div>
    </div>
  );
};

// Exportando página
export default Home;
