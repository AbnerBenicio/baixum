import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ArticleCard = ({ titulo, id, autor }) => {
  //Retornando card do artigo
  return (
    <div className="card-artigo mb-3" style={{ width: '70%'}}>
      <div className="card d-flex flex-column h-100">
        <div className="card-body">
          <Link to={`./${id}`}>{titulo}</Link>
          <h6 className="card-subtitle mb-2 text-body-secondary">Autor: {autor}</h6>
        </div>
      </div>
    </div>
  );
};

//Definindo tipos das props
ArticleCard.propTypes = {
  titulo: PropTypes.string,
  id: PropTypes.string,
  usuarioID: PropTypes.string,
  autor: PropTypes.string,
};

//Exportando componente
export default ArticleCard;
