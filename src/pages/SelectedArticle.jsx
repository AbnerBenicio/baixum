import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api4";
import "../styles/custom.css";

const SelectedArticle = () => {
  //Definindo variáveis
  const { artigoID } = useParams();
  const [artigo, setArtigo] = useState({});

  //Buscando artigo selecionado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`artigos/${artigoID}`);
      setArtigo(res.data);
    };

    fetchApi();
  }, [artigoID]);

  //Retornando página
  return (Object.keys(artigo).length > 0 ? ( // Verifica se artigo e artigo.autor existem
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2>{artigo.titulo}</h2> {/* Título do artigo */}
      <h2>Escrito por: {artigo.autor.nome}</h2> {/* Autor do artigo */}
      <p
        className="border border-gray"
        style={{
          width: "50rem",
          height: "20rem",
          overflowY: "auto",
          overflowX: "hidden",
          textAlign: "left",
        }}
      >
        {artigo.conteudo}
      </p>
      {/* Conteúdo do artigo */}
    </div>
  ) : null); // Renderiza null se artigo ou artigo.autor não existirem
};

//Retornando página
export default SelectedArticle;
