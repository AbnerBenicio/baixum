import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API3 from "../api/api3";
import API from "../api/api";
import ModalDelete from "../components/ModalDelete";

const SelectedArticleNotEvl = () => {
  //Definindo variáveis
  const { artigoID } = useParams();
  const [artigo, setArtigo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const Navigate = useNavigate();

  //Buscando artigo selecionado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API3.get(`articles-to-be-evaluated/${artigoID}`);
      setArtigo(res.data);
    };

    fetchApi();
  }, [artigoID]);

  //Função para validar artigo
  const handleValidate = async() => {
    try {
      await API.post("/articles", artigo)
      await API3.delete(`/articles-to-be-evaluated/${artigoID}`);
      alert("Artigo validado com sucesso!");
      Navigate("../artigos");
    } catch (err) {
      alert("Erro ao validar o artigo");
    } 
  }

  //Função para reprovar artigo
  const handleDelete = async() => {
    try {
      await API3.delete(`/articles-to-be-evaluated/${artigoID}`);
      alert("Artigo reprovado com sucesso!");
      Navigate("../artigos");
    } catch (err) {
      alert("Erro ao reprovar o artigo");
    }  
  }

  //Retornando página
  return (
    <>
      {/* Modal de exclusão do artigo */}
      {modalOpen && (
        <ModalDelete
          titulo={artigo.titulo}
          setModalOpen={setModalOpen}
          handleDelete={handleDelete}
        />
      )}

      {/* Informações do artigo */}
      <div className="container mt-5">
        <h1 className="mb-3">{artigo.titulo}</h1> {/* Título do artigo */}
        <hr/>
        <h2 className="mb-4">Escrito por: {artigo.autor}</h2> {/* Autor do artigo */}
        <hr/>
        <p className="mb-4">{artigo.conteudo}</p> {/* Conteúdo do artigo */}

        {/* Botões para reprovar e validar artigo */}
        <div className="mb-4">
          <button className="btn btn-primary me-3" onClick={handleValidate}>Aprovar</button> {/* Botão de aprovação */}
          <button className="btn btn-danger" onClick={() => setModalOpen(true)}>Reprovar</button> {/* Botão de reprovação */}
        </div>
      </div>
    </>
  );
};

//Exportando página
export default SelectedArticleNotEvl;
