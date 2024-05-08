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

      <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}> {/* Adicionando a classe my-4 para margem vertical */}
        {usuario && <HomeUser usuarioID={usuarioID} userAdm={usuario.adm}/>}
      </div>
    </div>
  );
};

// Exportando página
export default Home;
