import Icon1 from "../assets/user.png";
import Icon2 from "../assets/lock.png";
import { useNavigate } from "react-router-dom";
import API from "../api/api4";
import { useState } from "react";
import Logo from "../assets/BaixiumLogo.png"

const Register = () => {
  //Sets de informacoes cadastradas
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [senhaIncompativel, setSenhaIncompativel] = useState(false);
  const navigate = useNavigate();

  //Função para limpara estados
  const cleanData = () => {
    setName("");
    setEmail("");
    setSenha("");
    setConfSenha("");
    setSenhaIncompativel(false);
  };

  //Validacao de formulario
  const handleSubmit = async (e) => {
    //Prevenindo atualização após submit
    e.preventDefault();

        //Criando usuário
        if (senha == confSenha) {
          setSenhaIncompativel(false)
          const user = {
            nome: name.toUpperCase(),
            email: email,
            password: senha,
            administrador: false,
          };
          try {
            await API.post("/usuarios", user)
            //Limpando estados
            cleanData();
            navigate("/");
          } catch (err) {
            alert(err.response.data.detail);
          }
        } else {
          //Informando incompatibilidade de senhas
          setSenhaIncompativel(true);
        }
    };

  //Retornando página
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
    >
      <img
        src={Logo}
        alt="Descrição da imagem"
        style={{ width: "20%", height: "20%" }}
      />
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="card bg-light text-center">
          <div className="card-body d-flex flex-column align-items-center justify-content-center">
            {/* Formulário para cadastro de usuário */}
            <form onSubmit={handleSubmit}>
              {/* Campo para nome */}
              <div className="input-group flex-nowrap mb-4">
                <span className="input-group-text" id="addon-wrapping">
                  <img src={Icon1} alt="" />
                </span>
                <input
                  type="text"
                  name="Nome"
                  id="Nome"
                  className="form-control"
                  placeholder="Digite seu nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* Campo para email */}
              <div className="input-group flex-nowrap mb-4">
                <span className="input-group-text" id="addon-wrapping">
                  <img src={Icon1} alt="" />
                </span>
                <input
                  type="email"
                  name="Rmail"
                  id="Email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Campo para senha */}
              <div className="input-group flex-nowrap mb-4">
                <span className="input-group-text" id="addon-wrapping">
                  <img src={Icon2} alt="" />
                </span>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  className="form-control"
                  placeholder="Senha"
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                />
              </div>

              {/* Campo para confirmação de senha */}
              <div className="input-group flex-nowrap mb-4">
                <span className="input-group-text" id="addon-wrapping">
                  <img src={Icon2} alt="" />
                </span>
                <input
                  type="password"
                  name="senhaConfirm"
                  id="senhaConfirm"
                  className="form-control"
                  placeholder="Confirme sua senha"
                  onChange={(e) => setConfSenha(e.target.value)}
                  value={confSenha}
                />
              </div>

              {/* Informando que senhas são incompatíveis */}
              {senhaIncompativel && (
                <span className="text-danger">Senhas incompatíveis!</span>
              )}

              {/* Botão para cadastro de usuário */}
              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

//Exportando pagina
export default Register;
