import Icon1 from "../assets/user.png";
import Icon2 from "../assets/lock.png";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useEffect, useState } from "react";

const Register = () => {
  //Sets de informacoes cadastradas
  const [usuarios, setUsuarios] = useState();
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [campoBranco, setCampoBranco] = useState(false);
  const [senhaIncompativel, setSenhaIncompativel] = useState(false);
  const navigate = useNavigate();

  //Buscando usuários
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get("user");
      setUsuarios(res.data);
    };

    fetchApi();
  }, []);

  //Função para limpara estados
  const cleanData = () => {
    setName("");
    setEmail("");
    setSenha("");
    setConfSenha("");
    setSenhaIncompativel(false);
    setCampoBranco(false);
  };

  //Validacao de formulario
  const handleSubmit = async (e) => {
    //Prevenindo atualização após submit
    e.preventDefault();

    const existe = usuarios.some((usuario) => usuario.email === email);
    setUsuarioExiste(existe);

    if (!existe) {
      if (name !== "" && email !== "" && senha !== "") {
        //Criando usuário
        if (senha == confSenha) {
          const user = {
            name: name.toUpperCase(),
            email: email,
            password: senha,
            adm: false,
          };
          //Limpando estados
          cleanData();
          //Adicionando usuario no sistema
          // eslint-disable-next-line no-unused-vars
          const res = await API.post("user", user);
          navigate("/");
        } else {
          //Informando incompatibilidade de senhas
          setSenhaIncompativel(true);
        }
      } else {
        //Informando incompatibilidade de senhas
        setCampoBranco(true);
      }
    }
  };

  //Retornando página
  return (
    <div>
    <img
      src="../src/assets/BaixiumLogo.png"
      alt="Descrição da imagem"
      style={{ width: '50%', height: '50%' }}
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

            {/* Informando que existem campos em branco */}
            {campoBranco && <span className="text-danger">Há campo(s) em branco!</span>}

            {/* Informando que senhas são incompatíveis */}
            {senhaIncompativel && <span className="text-danger">Senhas incompatíveis!</span>}

            {/* Informando que usuário já existe */}
            {usuarioExiste && (
              <span className="text-danger">Usuário já existe! Utilize um novo email.</span>
            )}

            {/* Botão para cadastro de usuário */}
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

//Exportando pagina
export default Register;
