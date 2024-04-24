import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../api/api";

const SelectedArticle = () => {

    const { artigoID } = useParams()
    const [artigo, setArtigo] = useState({})

    useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`articles/${artigoID}`);
      setArtigo(res.data);
    };

    fetchApi();
  }, [artigoID]);

  return (
    <div>
        <h1>{artigo.titulo}</h1>
        <h2>Escrito por: {artigo.autor}</h2>
        <p>{artigo.conteudo}</p>
    </div>
    
  )
}

export default SelectedArticle
