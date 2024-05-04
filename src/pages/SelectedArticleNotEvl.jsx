import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API3 from "../api/api3";

const SelectedArticleNotEvl = () => {
  //Definindo variáveis
  const { artigoID } = useParams();
  const [artigo, setArtigo] = useState({});

  //Buscando artigo selecionado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API3.get(`articles-to-be-evaluated/${artigoID}`);
      setArtigo(res.data);
    };

    fetchApi();
  }, [artigoID]);

  //Retornando página
  return (
    <div>
      <h1>{artigo.titulo}</h1> {/*Título do artigo*/}
      <h2>Escrito por: {artigo.autor}</h2> {/*Autor do artigo*/}
      <p>{artigo.conteudo}</p> {/*Conteúdo do artigo*/}
    </div>
  );
};

//Retornando página
export default SelectedArticleNotEvl;
