import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import "../styles/custom.css";

const SelectedArticle = () => {
  //Definindo variáveis
  const { artigoID } = useParams();
  const [artigo, setArtigo] = useState({});

  //Buscando artigo selecionado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`articles/${artigoID}`);
      setArtigo(res.data);
    };

    fetchApi();
  }, [artigoID]);

  //Retornando página
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1>{artigo.titulo}</h1> {/* Título do artigo */}
      <h2>Escrito por: {artigo.autor}</h2> {/* Autor do artigo */}
      <p
        className="border border-gray"
        style={{
          width: "50rem",
          height: "20rem",
          overflowY: "auto",
          overflowX: "hidden",
          textAlign: "left"
        }}
      >
        {artigo.conteudo}
      </p>
      {/* Conteúdo do artigo */}
    </div>
  );
};

//Retornando página
export default SelectedArticle;
