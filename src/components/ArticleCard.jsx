import { Link } from "react-router-dom"

const ArticleCard = ({titulo}) => {
  return (
    <div>
        <Link>{titulo}</Link>
    </div>
  )
}

export default ArticleCard