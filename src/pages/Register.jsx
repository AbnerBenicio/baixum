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

  //Buscando usuários
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get("user");
      setUsuarios(res.data);
    };

    fetchApi();
  }, []);

  const navigate = useNavigate();

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
            adm: false
          };
          //Limpando estados
          setName("");
          setEmail("");
          setSenha("");
          setConfSenha("");
          setSenhaIncompativel(false);
          setCampoBranco(false);
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
    <div className="login-container">
      {/*Formulário para cadastro de usuário */}
      <form onSubmit={handleSubmit}>
        {/*Campo para nome*/}
        <label>
          <span>
            <img src={Icon1} alt="" />
          </span>
          <input
            type="text"
            name="Nome"
            id="Nome"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        {/*Campo para email*/}
        <label>
          <span>
            <img src={Icon1} alt="" />
          </span>
          <input
            type="email"
            name="Rmail"
            id="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        {/*Campo para senha*/}
        <label>
          <span>
            <img src={Icon2} alt="" />
          </span>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </label>
        {/*Campo para confirmação de senha */}
        <label>
          <span>
            <img src={Icon2} alt="" />
          </span>
          <input
            type="password"
            name="senhaConfirm"
            id="senhaConfirm"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfSenha(e.target.value)}
            value={confSenha}
          />
        </label>
        {/*Informando que existem campos em brancos*/}
        {campoBranco && <span>Há campo(s) em branco!</span>}
        {/*Informando que senhas são incompatíveis*/}
        {senhaIncompativel && <span>Senhas incompatíveis!</span>}
        {/*Informando que usuário já existe*/}
        {usuarioExiste && (
          <span>Usuário já existe! Utilize um novo email.</span>
        )}

        {/*Botão para cadastro de usuário*/}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

//Exportando pagina
export default Register;
