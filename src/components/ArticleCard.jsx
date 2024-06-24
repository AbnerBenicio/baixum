import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ArticleCard = ({ titulo, id, autor }) => {
  //Retornando card do artigo
  return (
    <div className="card mb-3"  style={{ width: '100%', height: '150px' }}>
      <div className="card-body">
        <Link to={`./${id}`} className="card-link">
          <h5 className="card-title">{titulo}</h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted">Autor: {autor}</h6>
      </div>
    </div>
  );
};

//Definindo tipos das props
ArticleCard.propTypes = {
  titulo: PropTypes.string,
  id: PropTypes.string,
  autor: PropTypes.string,
};

//Exportando componente
export default ArticleCard;
