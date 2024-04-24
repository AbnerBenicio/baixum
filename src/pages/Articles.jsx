import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import ArticleCard from "../components/ArticleCard";
import SelectTema from "../components/SelectTema";
import BtnPaginacao from "../components/BtnPaginacao";

const Articles = () => {
  //Criando variáveis para controle da paginação
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const [artigos, setArtigos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { usuarioID } = useParams();

  //Buscando artigos
  useEffect(() => {
    const fetchApi = async () => {
      try {
        //Buscando artigos na página atual
        const res = await API.get(
          `articles/?page=${page}&limit=5&tema=${temaSelecionado}`
        );
        setArtigos(res.data);

        //Buscando artigos da próxima página
        const nextRes = await API.get(
          `articles/?page=${page + 1}&limit=5&tema=${temaSelecionado}`
        );

        //Verifica se próxima página não tem artigos
        if (nextRes.data.length === 0) {
          //Se não tiver, define que não existem mais páginas depois
          setHasNextPage(false);
        } else {
          //Se tiver, define que existe mais páginas depois
          setHasNextPage(true);
        }
      } catch (error) {
        // Se ocorrer um erro, verifica se é erro 404 (não encontrado)
        if (error.response && error.response.status === 404) {
          setArtigos([]); // Define artigos como vazio
          setHasNextPage(false); // Define que não há artigos
        }
      }
    };

    fetchApi();
  }, [temaSelecionado, page]);

  //Função acionada quando há troca de tema
  const handleMudaTema = (e) => {
    //Define o tema selecionado
    setTemaSelecionado(e.target.value);
    //Retorna a página 1
    setPage(1);
  };

  //Função acionada ao ir para a próxima página
  const handleProxPage = () => {
    //Definindo página atual
    setPage((prev) => prev + 1);
  };

  //Função acionada ao ir para a página anterior
  const handlePrevPage = () => {
    //Definindo página atual
    setPage((prev) => prev - 1);
  };

  //Retornando página
  return (
    //Seleção de tema dos artigos
    <div className="artigos-main">
      <SelectTema tema={temaSelecionado} handleMudaTema={handleMudaTema} />

      {/*Exibindo artigos, se requisição for atendida e houverem artigos*/}
      {artigos && artigos.length > 0 ? (
        <div className="artigos">
          {/*Mapeando artigos*/}
          {artigos.map((artigo) => (
            //Exibindo artigos
            <ArticleCard
              key={artigo.id}
              titulo={artigo.titulo}
              id={artigo.id}
              usuarioID={usuarioID}
              autor={artigo.autor}
            />
          ))}
        </div>
      ) : (
        //Caso não existam artigos, informando ao usuário
        <h1>Sem artigos aqui</h1>
      )}

      {/*Botões para passar de página*/}
      <BtnPaginacao
        page={page}
        handleProxPage={handleProxPage}
        handlePrevPage={handlePrevPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

//Exportando página
export default Articles;
