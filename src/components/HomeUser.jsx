import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomeUser = ({ usuarioID, userAdm }) => {
  //Retornando componente
  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      {/*Verificando se usuário é administrador ou não
         - Se for, exibe somente uma opção
         - Se não for, exibe demais opções
        */}
      {userAdm ? (
        <div className="col-md-20">
          <h2>Avalie Artigos</h2>
          <p>Avalie os artigos dos usuários</p>
          <p>
            <Link
              className="btn btn-secondary"
              to={`/${usuarioID}/admin/artigos`}
              role="button"
            >
              Ver detalhes &raquo;
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="col-md-3">
            <h2>Faça Seu Artigo</h2>
            <p>
              Busque um tema em que você domina, escreva sobre ele e mande para
              o nosso site, para que seja visto por mais pessoas que usarão seu
              conhecimento
            </p>
            <p>
              <Link
                className="btn btn-secondary"
                to={`/${usuarioID}/user/adicionar-artigos`}
                role="button"
              >
                Ver detalhes &raquo;
              </Link>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Buque Conhecimento</h2>
            <p>
              A vida é uma descoberta! Procure o tema em que te interessa e veja
              vários artigos publicados por outras pessoas, que estão repletos
              de conhecimento
            </p>
            <p>
              <Link
                className="btn btn-secondary"
                to={`/${usuarioID}/user/artigos`}
                role="button"
              >
                Ver detalhes &raquo;
              </Link>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Veja Seus Artigos</h2>
            <p>
              Ele ficará registrado para sempre em nosso site! Então entre
              quando quiser, edite seu arquivo, espere ser aprovado e está
              pronto
            </p>
            <p>
              <Link
                className="btn btn-secondary"
                to={`/${usuarioID}/user/meus-artigos`}
                role="button"
              >
                Ver detalhes &raquo;
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

//Definindo tipos das props
HomeUser.propTypes = {
  usuarioID: PropTypes.string,
  userAdm: PropTypes.bool,
};

//Exportando componente
export default HomeUser;
