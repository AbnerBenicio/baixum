import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const ArticleCard = ({titulo, id, usuarioID}) => {
  return (
    <div>
        <Link to={`/${usuarioID}/user/artigos/${id}`}>{titulo}</Link>
    </div>
  )
}

ArticleCard.propTypes = {
  titulo: PropTypes.string,
  id: PropTypes.string,
  usuarioID: PropTypes.string
}

export default ArticleCard