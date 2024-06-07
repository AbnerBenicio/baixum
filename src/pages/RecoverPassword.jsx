import { useState } from "react";
import API from "../api/api4";
import Logo from "../assets/BaixiumLogo.png"

const RecoverPassword = () => {
  //Definindo variáveis
  const [email, setEmail] = useState("");

  //Validação do formulário
  const handleSubmit =(e) => {
    //Evitando atualização da página
    e.preventDefault();
    API.post("recuperar-senha", {email: email})
  };

  //Retorno da página
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height: "100vh", width: "100vw"}}>
      <img
        src={Logo}
        alt="Logo"
        style={{ width: '50%', height: '50%', marginBottom: '20px' }}
      />
      <div className="card bg-light text-center">
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h2>Esqueceu a sua senha? Recupere-a preenchendo o formulário abaixo!</h2>

          {/* Formulário para recuperação da senha */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Digite seu email</label>
              <input
                value={email}
                name="email"
                type="email"
                id="email"
                className="form-control"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Recuperar</button> {/*Botão para submeter formulário*/}
          </form>
        </div>
      </div>
    </div>

  );
};

//Exportando página
export default RecoverPassword;
