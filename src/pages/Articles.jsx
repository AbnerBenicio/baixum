import { useEffect, useState } from "react";
import API from "../api/api";
import ArticleCard from "../components/ArticleCard";

const Articles = () => {
    //Criando variáveis para controle da paginação
    const [temaSelecionado, setTemaSelecionado] = useState("")
    const [artigos, setArtigos] = useState([])
    const [page, setPage] = useState(1)
    const [semArtigos, setSemArtigos] = useState(false)

    //Buscando artigos
    useEffect(() => {
        const fetchApi = async () => {
            //Buscando artigos na página atual
          const res = await API.get(`articles/?page=${page}&limit=5&tema=${temaSelecionado}`);
          setArtigos(res.data);

          //Buscando artigos da próxima página
          const nextRes = await API.get(`articles/?page=${page + 1}&limit=5&tema=${temaSelecionado}`);
          
          //Verifica se próxima página não tem artigos
          if(nextRes.data.length == 0) {
            //Se não tiver, define que não existem mais páginas depois
            setSemArtigos(true)
          } else {
            //Se tiver, define que existe mais páginas depois
            setSemArtigos(false)
          }
        };
        
        fetchApi();

    }, [temaSelecionado, page]);

    //Função acionada quando há troca de tema
    const handleMudaTema = (e) => {
        //Define o tema selecionado
        setTemaSelecionado(e.target.value)
        //Retorna a página 1
        setPage(1)
    }

    //Função acionada ao ir para a próxima página
    const handleProxPage = () => {
        //Definindo página atual
        setPage(prev => prev + 1)
    }

    //Função acionada ao ir para a página anterior
    const handlePrevPage = () => {
        //Definindo página atual
        setPage(prev => prev - 1)
    }

    //Retornando página
  return (
    
    //Seleção de tema dos artigos
    <div className="artigos-main">
        <select value={temaSelecionado} name="temas" onChange={handleMudaTema}>
            <option value="">Selecione...</option>
            <option value="programacao">Programação</option>
            <option value="auto-ajuda">Auto-ajuda</option>
        </select>

        {/*Exibindo artigos, se requisição for atendida e houverem artigos*/}
        {artigos && artigos.length > 0 ? (
            <div className="artigos">
                {/*Mapeando artigos*/}
                {artigos.map(artigo => (
                    //Exibindo artigos
                    <ArticleCard key={artigo.id} titulo={artigo.titulo}/>
                ))}
            </div>
        ) : 
            //Caso não existam artigos, informando ao usuário
            <h1>Sem artigos aqui</h1>
        }

        {/*Botões para passar de página*/}
        <div className="buttons">
            {/*Botão para voltar a página
              Se estiver na primeira página é desabilitado
              Se estiver em outras páginas é habilitado
            */}
            {page == 1 ? <button disabled>Prev</button> : <button onClick={handlePrevPage}>Prev</button>}

            {/*Indicativo da página atual*/}
            <span>{page}</span>

            {/*Botão para ir para a próxima página
              Se não tiver próxima página é desabilitado
              Se houver próxima página é habilitado
            */}
            {semArtigos ? <button disabled>Next</button> : <button onClick={handleProxPage} >Next</button>}
 
        </div>

    </div>
  )
}

//Exportando página
export default Articles