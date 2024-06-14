import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api4";
import SelectTema from "../components/SelectTema";
import ModalDelete from "../components/ModalDelete";

const SelectedMyArticle = () => {
  //Definindo variáveis
  const { artigoID } = useParams();
  const [artigo, setArtigo] = useState({});
  const [temaSelecionado, setTemaSelecionado] = useState(
    "00000000-0000-0000-0000-000000000000"
  );
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const Navigate = useNavigate();

  //Buscando artigo selecionado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`artigos/${artigoID}`);
      setArtigo(res.data);
      setTemaSelecionado(res.data.tema.id);
      setTitulo(res.data.titulo);
      setConteudo(res.data.conteudo);
    };

    fetchApi();
  }, [artigoID]);

  const handleMudaTema = async (e) => {
    //Define o tema selecionado
    setTemaSelecionado(e.target.value);
  };

  //Função para limpar dados input
  const cleanData = () => {
    setTemaSelecionado("");
    setTitulo("");
    setConteudo("");
  };

  //Função para atualizar artigo
  const handleUpdate = async () => {
    const artigoAtualizado = {
      titulo: titulo,
      conteudo: conteudo,
      tema: {id: temaSelecionado},
      autor: {id: artigo.autor.id},
      validado: false,
    };
    try {
      await API.put(`artigos/${artigoID}`, artigoAtualizado);
      cleanData();
      alert("Artigo atualizado com sucesso!");
      Navigate("../meus-artigos");
    } catch (error) {
      alert("Erro ao enviar o artigo: " + error.response.data.detail);
    }
  };

  //Função para deletar artigo
  const handleDelete = async () => {
    try {
      await API.delete(`/artigos/${artigoID}`);
      cleanData();
      alert("Artigo deletado com sucesso!");
      Navigate("../meus-artigos");
    } catch (err) {
      alert("Erro ao deletar o artigo");
    }
  };

  //Retornando página
  return (
    <>
      {modalOpen && (
        <ModalDelete
          titulo={artigo.titulo}
          setModalOpen={setModalOpen}
          handleDelete={handleDelete}
        />
      )}
      {Object.keys(artigo).length ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          {/* Adicionando margem vertical */}
          <form
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "90vh" }}
          >
            <div className="col-12">
              <label htmlFor="select" className="form-label">
                Tema do Artigo:
              </label>
              <SelectTema
                tema={temaSelecionado}
                handleMudaTema={handleMudaTema}
              />
            </div>
            <div className="col-12">
              <label htmlFor="titulo" className="form-label">
                Título do Artigo:
              </label>
              <input
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <label htmlFor="conteudo" className="form-label">
                Conteúdo do artigo:
              </label>
              <textarea
                id="conteudo"
                name="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                className="form-control"
                cols="80"
                rows="8"
                style={{ resize: "none" }}
              />
            </div>
          </form>
          {/* Botões para reprovar e validar artigo */}
          <div className="mb-4">
            <button className="btn btn-primary me-3" onClick={handleUpdate}>
              Editar
            </button>
            {/* Botão de aprovação */}
            <button
              className="btn btn-danger"
              onClick={() => setModalOpen(true)}
            >
              Deletar
            </button>
            {/* Botão de reprovação */}
          </div>
        </div>
      ) : (
        <h1>Nenhum artigo selecionado</h1>
      )}
    </>
  );
};

//Exportando página
export default SelectedMyArticle;
