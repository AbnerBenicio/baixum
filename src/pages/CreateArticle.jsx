import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import API_3 from "../api/api3";
import SelectTema from "../components/SelectTema";

const CreateArticle = () => {
  //Criando variáveis para guardar dados do fomulário e autor
  const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const { usuarioID } = useParams();

  //Buscando autor/usuário
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`user/${usuarioID}`);
      setAutor(res.data);
    };

    fetchApi();
  }, [usuarioID]);

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
        fk_id_autor: autor.id
      };

      //Tentando enviar formulário
      try {
        //Enviando artigo
        await API_3.post("/articles-to-be-evaluated", artigo);
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

  const handleMudaTema = (e) => {
    setTema(e.target.value)
  }

  //Retornando página
  return (
      <div className="container mt-4">

      <div className="add-artigo margin-top-150 d-flex justify-content-center align-items-center w-100">
        {/*Formulário de criação do artigo*/}
        <form className="mb-3" onSubmit={handleSubmit}>
          {/*Campo para título do artigo*/}
          <div className="input-group mb-3">
            <span className="input-group-text">Título</span>
            <input
              value={titulo}
              type="text"
              name="titulo"
              className="form-control"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          {/*Campo para tema do artigo*/}
          <div className="input-group mb-3">
            <span className="input-group-text">Tema</span>
            <SelectTema tema={tema} handleMudaTema={handleMudaTema} />
          </div>

          {/*Campo para conteúdo do artigo*/}
          <div className="mb-3 z-index-10">
            <label className="form-label">Conteúdo</label>
            <div className="input-group">
              <textarea
                value={conteudo}
                name="conteudo"
                className="form-control"
                id=""
                cols="100"
                rows="10"
                style={{ resize: "none" }}
                onChange={(e) => setConteudo(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/*Botão para envio do formulário*/}
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>

  );
};

//Exportando página
export default CreateArticle;
