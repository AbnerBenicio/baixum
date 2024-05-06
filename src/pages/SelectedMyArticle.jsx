import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import API3 from "../api/api3";
import SelectTema from "../components/SelectTema";
import ModalDelete from "../components/ModalDelete";

const SelectedMyArticle = () => {
  //Definindo variáveis
  const { artigoID } = useParams();
  const [artigo, setArtigo] = useState({});
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const Navigate = useNavigate();

  //Buscando artigo selecionado
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`articles/${artigoID}`);
      setArtigo(res.data);
      setTemaSelecionado(res.data.tema);
      setTitulo(res.data.titulo);
      setConteudo(res.data.conteudo);
    };

    fetchApi();
  }, [artigoID]);

  const handleMudaTema = (e) => {
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
    if (temaSelecionado != "" && titulo != "" && conteudo != "") {
      const artigoAtualizado = {
        titulo: titulo,
        conteudo: conteudo,
        tema: temaSelecionado,
        autor: artigo.autor,
        fk_id_autor: artigo.fk_id_autor,
      };
      try {
        await API3.post("/articles-to-be-evaluated", artigoAtualizado);
        await API.delete(`/articles/${artigoID}`);
        cleanData();
        alert("Artigo atualizado com sucesso!");
        Navigate("../meus-artigos");
      } catch (err) {
        alert("Erro ao atualizar o artigo");
      }
    } else {
      alert("Todas as informações devem ser preenchidas");
    }
  };
  
  //Função para deletar artigo
  const handleDelete = async() => {
    try {
      await API.delete(`/articles/${artigoID}`);
      cleanData();
      alert("Artigo deletado com sucesso!");
      Navigate("../meus-artigos");
    } catch (err) {
      alert("Erro ao deletadar o artigo");
    }  
  }

  //Retornando página
  return (
    <div>
      {modalOpen && <ModalDelete titulo={artigo.titulo} setModalOpen={setModalOpen} handleDelete={handleDelete}/>}
      {Object.keys(artigo).length ? (
        <>
        {/* Formulario Edição */}
          <form>
            <SelectTema
              tema={temaSelecionado}
              handleMudaTema={handleMudaTema}
            />
            <label>
              <input
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              {/*Título do artigo*/}
            </label>
            <label>
              <input
                name="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
              {/*Conteúdo do artigo*/}
            </label>
          </form>
          <button className="update" onClick={handleUpdate}>
            Editar
          </button>
          <button className="delete" onClick={() => setModalOpen(true)}>
            Excluir
          </button>
        </>
      ) : (
        <h1>Nenhum artigo selecionado</h1>
      )}
    </div>
  );
};

export default SelectedMyArticle;
