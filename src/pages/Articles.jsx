import { useEffect, useState } from "react";
import API from "../api/api4";
import ArticleCard from "../components/ArticleCard";
import SelectTema from "../components/SelectTema";
import BtnPaginacao from "../components/BtnPaginacao";
import "../styles/custom.css";

const Articles = () => {
  //Criando variáveis para controle da paginação
  const [temaSelecionado, setTemaSelecionado] = useState("00000000-0000-0000-0000-000000000000");
  const [artigos, setArtigos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  //Buscando artigos
  useEffect(() => {
    const fetchApi = async () => {
      try {
        //Buscando artigos na página atual
        const res = await API.get(
          `artigos/validos/?page=${page}&limit=5&temaId=${temaSelecionado}`
        );
        setArtigos(res.data);

        //Buscando artigos da próxima página
        const nextRes = await API.get(
          `artigos/validos/?page=${page + 1}&limit=5&temaId=${temaSelecionado}`
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
    <div className=" jumbotron container-fluid">
      <div className="row mx-auto">
        {/* Coluna para Busca de Tema */}
        <div className="bg-light py-4">
          <div className="d-flex flex-column align-items-center">
            <h2 className="fw-normal" style={{fontSize: "25px"}}>Busque o tema</h2>
            <SelectTema
              tema={temaSelecionado}
              handleMudaTema={handleMudaTema}
            />
          </div>
        </div>

        {/* Coluna para Artigos e Paginação */}
        <div className="col-md-8 offset-md-2 py-4 mt-5">
          <div className="artigos">
            {artigos && artigos.length > 0 ? (
              artigos.map((artigo) => (
                <ArticleCard
                  key={artigo.id}
                  titulo={artigo.titulo}
                  id={artigo.id}
                  autor={artigo.autor.nome}
                />
              ))
            ) : (
              <h1>Sem artigos aqui</h1>
            )}
          </div>
          <BtnPaginacao
            page={page}
            handleProxPage={handleProxPage}
            handlePrevPage={handlePrevPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};

//Exportando página
export default Articles;
