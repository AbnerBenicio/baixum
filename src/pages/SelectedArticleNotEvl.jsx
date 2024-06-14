import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api4";
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
      const res = await API.get(`artigos/${artigoID}`);
      setArtigo(res.data);
      console.log(res.data);
    };

    fetchApi();
  }, [artigoID]);

  //Função para validar artigo
  const handleValidate = async () => {
    const ArtigoValidado = {
      ...artigo,
      validado: true,
    };
    try {
      await API.put(`/artigos/${artigoID}`, ArtigoValidado);
      alert("Artigo validado com sucesso!");
      Navigate("../artigos");
    } catch (err) {
      alert("Erro ao validar o artigo");
    }
  };

  //Função para reprovar artigo
  const handleDelete = async () => {
    try {
      await API.delete(`/artigos/${artigoID}`);
      alert("Artigo reprovado!");
      Navigate("../artigos");
    } catch (err) {
      alert("Erro ao reprovar o artigo");
    }
  };

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
      {Object.keys(artigo).length > 0 && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
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
          {/* Botões para reprovar e validar artigo */}
          <div className="mb-4">
            <button className="btn btn-primary me-3" onClick={handleValidate}>
              Aprovar
            </button>
            {/* Botão de aprovação */}
            <button
              className="btn btn-danger"
              onClick={() => setModalOpen(true)}
            >
              Reprovar
            </button>
            {/* Botão de reprovação */}
          </div>
        </div>
      )}
    </>
  );
};

//Exportando página
export default SelectedArticleNotEvl;
