// Importando os hooks necessários e os componentes
import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SelectTema from "../components/SelectTema";
import BtnPaginacao from "../components/BtnPaginacao";
import useFetchArtigos from "../hooks/useFetchArticles.js";
import PropTypes from "prop-types";

// Componente para exibir artigos
const ArticlesShow = ({ apiUrl }) => {
  // Inicializando o estado para o tema selecionado, artigos, página atual e se há próxima página
  const [temaSelecionado, setTemaSelecionado] = useState("00000000-0000-0000-0000-000000000000");
  const { artigos, page, setPage, hasNextPage } = useFetchArtigos(`${apiUrl}&temaId=${temaSelecionado}`);

  // Função para lidar com a mudança de tema
  const handleMudaTema = (e) => {
    // Atualiza o tema selecionado e retorna para a página 1
    setTemaSelecionado(e.target.value);
    setPage(1);
  };

  // Renderizando o componente
  return (
    <div className="jumbotron container-fluid">
      <div className="row mx-auto">
        <div className="bg-light py-4">
          <div className="d-flex flex-column align-items-center">
            <h2 className="fw-normal" style={{ fontSize: "25px" }}>
              Busque o tema
            </h2>
            {/* Componente para selecionar o tema */}
            <SelectTema tema={temaSelecionado} handleMudaTema={handleMudaTema} />
          </div>
        </div>
        <div className="col-md-8 offset-md-2 py-4 mt-5">
          <div className="artigos">
            {/* Mapeando os artigos para exibir */}
            {artigos && artigos.length > 0 ? (
              artigos.map((artigo) => (
                <ArticleCard key={artigo.id} titulo={artigo.titulo} id={artigo.id} autor={artigo.autor.nome} />
              ))
            ) : (
              <h1>Sem artigos aqui</h1>
            )}
          </div>
          {/* Componente para controle de paginação */}
          <BtnPaginacao page={page} handleProxPage={() => setPage((prev) => prev + 1)} handlePrevPage={() => setPage((prev) => prev - 1)} hasNextPage={hasNextPage} />
        </div>
      </div>
    </div>
  );
};

//Definindo tipos das props
ArticlesShow.propTypes = {
  apiUrl: PropTypes.string
};

// Exportando o componente
export default ArticlesShow;
