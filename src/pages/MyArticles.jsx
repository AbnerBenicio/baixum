import { useParams } from "react-router-dom";
import ArticlesShow from "../components/ArticlesShow";

const MyArticles = () => {

  const { usuarioID } = useParams();

  //Retornando página
  return (
    <ArticlesShow apiUrl={`artigos/validos/?autorId=${usuarioID}`}/>
  );
};

export default MyArticles;
