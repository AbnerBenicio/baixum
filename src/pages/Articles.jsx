import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SelectTema from "../components/SelectTema";
import BtnPaginacao from "../components/BtnPaginacao";
import useFetchArtigos from "../hooks/useFetchArticles.js";
import "../styles/custom.css";

const Articles = () => {
  const [temaSelecionado, setTemaSelecionado] = useState("00000000-0000-0000-0000-000000000000");
  const { artigos, page, setPage, hasNextPage } = useFetchArtigos(`artigos/validos/?temaId=${temaSelecionado}`);

  const handleMudaTema = (e) => {
    setTemaSelecionado(e.target.value);
    setPage(1);
  };

  return (
    <div className="jumbotron container-fluid">
      <div className="row mx-auto">
        <div className="bg-light py-4">
          <div className="d-flex flex-column align-items-center">
            <h2 className="fw-normal" style={{fontSize: "25px"}}>Busque o tema</h2>
            <SelectTema tema={temaSelecionado} handleMudaTema={handleMudaTema} />
          </div>
        </div>

        <div className="col-md-8 offset-md-2 py-4 mt-5">
          <div className="artigos">
            {artigos && artigos.length > 0 ? (
              artigos.map((artigo) => (
                <ArticleCard key={artigo.id} titulo={artigo.titulo} id={artigo.id} autor={artigo.autor.nome} />
              ))
            ) : (
              <h1>Sem artigos aqui</h1>
            )}
          </div>
          <BtnPaginacao page={page} handleProxPage={() => setPage((prev) => prev + 1)} handlePrevPage={() => setPage((prev) => prev - 1)} hasNextPage={hasNextPage} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
