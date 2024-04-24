import PropTypes from 'prop-types'

function BtnPaginacao({ page, handleProxPage, handlePrevPage, hasNextPage }) {
  return (
    <div className="buttons">
        {/*Botão para voltar a página
              Se estiver na primeira página é desabilitado
              Se estiver em outras páginas é habilitado
        */}
        {page == 1 ? (
          <button disabled>Prev</button>
        ) : (
          <button onClick={handlePrevPage}>Prev</button>
        )}

        {/*Indicativo da página atual*/}
        <span>{page}</span>

        {/*Botão para ir para a próxima página
              Se não tiver próxima página é desabilitado
              Se houver próxima página é habilitado
        */}
        {!hasNextPage ? (
          <button disabled>Next</button>
        ) : (
          <button onClick={handleProxPage}>Next</button>
        )}
      </div>
  )
}

BtnPaginacao.propTypes = {
    page: PropTypes.string,
    handleProxPage: PropTypes.func,
    handlePrevPage: PropTypes.func,
    hasNextPage: PropTypes.bool
}

export default BtnPaginacao
