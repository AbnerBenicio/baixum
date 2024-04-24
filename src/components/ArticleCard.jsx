import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ArticleCard = ({ titulo, id, usuarioID, autor }) => {
  //Retornando card do artigo
  return (
    <div className="card-artigo">
      {/*Título do artigo servindo de Link para página do artigo*/}
      <Link to={`/${usuarioID}/user/artigos/${id}`}>{titulo}</Link>
      {/*Autor do artigo*/}
      <h4>Autor: {autor}</h4>
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
