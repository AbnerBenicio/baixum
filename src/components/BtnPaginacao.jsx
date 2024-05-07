import PropTypes from "prop-types";

function BtnPaginacao({ page, handleProxPage, handlePrevPage, hasNextPage }) {
  //Retornando botões
  return (
    <div className="buttons">
      {/* Botão para voltar a página */}
      {page === 1 ? (
        <button className="btn btn-secondary" disabled>Prev</button>
      ) : (
        <button className="btn btn-primary" onClick={handlePrevPage}>Prev</button>
      )}

      {/* Indicativo da página atual */}
      <span className="mx-2">{page}</span>

      {/* Botão para ir para a próxima página */}
      {!hasNextPage ? (
        <button className="btn btn-secondary" disabled>Next</button>
      ) : (
        <button className="btn btn-primary" onClick={handleProxPage}>Next</button>
      )}
    </div>
  );
}

//Definindo tipos das props
BtnPaginacao.propTypes = {
  page: PropTypes.string,
  handleProxPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
  hasNextPage: PropTypes.bool,
};

//Exportando componente
export default BtnPaginacao;
