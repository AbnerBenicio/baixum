import React from 'react';
import '../styles/custom.css';

const Home = () => {
  // Retornando página
  return (
    <div>
      <div className="jumbotron bg-light">
        <div className="container-fluid text-center">
          <h1 className="display-3">Baixum</h1>
          <p>O seu site de artigos, para compartilhar e aumentar o seu conhecimento</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Faça Seu Artigo</h2>
            <p>Busque um tema em que você domina, escreva sobre ele e mande para o nosso site, para que seja visto por mais pessoas que usarão seu conhecimento </p>
            <p><a className="btn btn-secondary" href="#" role="button">Ver detalhes &raquo;</a></p>
          </div>
          <div className="col-md-4">
            <h2>Buque Conhecimento</h2>
            <p>A vida é uma descoberta! Procure o tema em que te interessa e veja vários artigos publicados por outras pessoas, que estão repletos de conhecimento </p>
            <p><a className="btn btn-secondary" href="#" role="button">Ver detalhes &raquo;</a></p>
          </div>
          <div className="col-md-4">
            <h2>Veja Seus Artigos</h2>
            <p>Ele ficará registrado para sempre em nosso site! Então entre quando quiser, edite seu arquivo, espere ser aprovado e está pronto</p>
            <p><a className="btn btn-secondary" href="#" role="button">Ver detalhes &raquo;</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportando página
export default Home;
