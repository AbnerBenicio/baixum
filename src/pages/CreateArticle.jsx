import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const CreateArticle = () => {
  //Criando variáveis para guardar dados do fomulário e autor
  const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const { id } = useParams();

  //Buscando autor/usuário
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`user/${id}`);
      setAutor(res.data);
    };

    fetchApi();
  }, [id]);

  //Função para limpeza das varáveis
  const cleanData = () => {
    setTitulo("");
    setTema("");
    setConteudo("");
  };

  //Função para submeter o formulário
  const handleSubmit = async (e) => {
    //Evitando atualização da página
    e.preventDefault();

    //Verificando se campos estão preenchidos
    if (titulo !== "" && tema !== "" && conteudo !== "") {
      //Definindo dados do artigo
      const artigo = {
        titulo: titulo,
        conteudo: conteudo,
        autor: autor.name,
        tema: tema,
      };

      //Tentando enviar formulário
      try {
        //Enviando artigo
        await API.post("/articles", artigo);
        //Alertando ao usuário que artigo foi enviado com sucesso
        alert("Artigo enviado com sucesso!");
        // Limpando os campos do formulário
        cleanData();
      } catch (error) {
        //Alertando erro de envio, se houver
        alert("Erro ao enviar o artigo: " + error);
      }
    } else {
      //Alertando que existem campos não preenchidos
      alert("Todas as informações devem ser preenchidas");
    }
  };

  //Retornando página
  return (
    <div className="add-artigo">
      {/*Formulário de criação do artigo*/}
      <form onSubmit={handleSubmit}>
        {/*Campo para título do artigo*/}
        <label>
          <span>Título</span>
          <input
            value={titulo}
            type="text"
            name="titulo"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        {/*Campo para tema do artigo*/}
        <label>
          <span>Tema</span>
          <select
            value={tema}
            name="tema"
            onChange={(e) => setTema(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="programacao">Programação</option>
            <option value="auto-ajuda">Auto-ajuda</option>
          </select>
        </label>
        {/*Campo para conteúdo do artigo*/}
        <label>
          <label>Conteúdo</label>
          <textarea
            value={conteudo}
            name="conteudo"
            id=""
            cols="60"
            rows="10"
            style={{ resize: "none" }}
            onChange={(e) => setConteudo(e.target.value)}
          ></textarea>
        </label>

        {/*Botão para envio do formulário*/}
        <button>Enviar</button>
      </form>
    </div>
  );
};

//Exportando página
export default CreateArticle;
