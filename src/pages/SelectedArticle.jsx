import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import '../styles/custom.css';

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
    <div class="container text-center full-width">
      <div class="row">
        <div class="col-4 vertical-line">
          <h1>{artigo.titulo}</h1> {/*Título do artigo*/}
          <h2>Escrito por: {artigo.autor}</h2> {/*Autor do artigo*/}
        </div>
        
        <div class="col-8">
          <p>{artigo.conteudo}</p> {/*Conteúdo do artigo*/}
        </div>
      </div>
    </div>
  );
};

//Retornando página
export default SelectedArticle;
