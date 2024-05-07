import { useEffect, useState } from "react";
import API3 from "../api/api3";
import ArticleCard from "../components/ArticleCard";
import SelectTema from "../components/SelectTema";
import BtnPaginacao from "../components/BtnPaginacao";

const ArticlesNotEvl = () => {
  //Criando variáveis para controle da paginação
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const [artigos, setArtigos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  //Buscando artigos
  useEffect(() => {
    const fetchApi = async () => {
      try {
        //Buscando artigos na página atual
        const res = await API3.get(
          `articles-to-be-evaluated/?page=${page}&limit=5&tema=${temaSelecionado}`
        );
        setArtigos(res.data);

        //Buscando artigos da próxima página
        const nextRes = await API3.get(
          `articles-to-be-evaluated/?page=${page + 1}&limit=5&tema=${temaSelecionado}`
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
    <div className="artigos-main container">
      {/* Seleção de tema dos artigos */}
      <div className="mb-4 margin-top-75">
        <SelectTema tema={temaSelecionado} handleMudaTema={handleMudaTema} />
      </div>

      {/* Exibindo artigos */}
      {artigos && artigos.length > 0 ? (
        <div className="artigos row">
          {/* Mapeando artigos */}
          {artigos.map((artigo) => (
            <div key={artigo.id} className="col-md-12">
              {/* Exibindo artigo */}
              <ArticleCard
                titulo={artigo.titulo}
                id={artigo.id}
                autor={artigo.autor}
              />
            </div>
          ))}
        </div>
      ) : (
        // Caso não existam artigos, informando ao usuário
        <h1 className="text-center mt-5">Sem artigos aqui</h1>
      )}

      {/* Botões para passar de página */}
      <div className="d-flex justify-content-center my-4">
        <BtnPaginacao
          page={page}
          handleProxPage={handleProxPage}
          handlePrevPage={handlePrevPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>

  );
};

//Exportando página
export default ArticlesNotEvl;
