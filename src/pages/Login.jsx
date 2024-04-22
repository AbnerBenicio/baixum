import Icon1 from "../assets/user.png";
import Icon2 from "../assets/lock.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

const Login = () => {
  const [usuarios, setUsuarios] = useState();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioExistente, setUsuarioExistente] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get("user");
      // const data = await res.json()
      setUsuarios(res.data);
    };

    fetchApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    usuarios.map((usuario) => {
        if(usuario.email == email && usuario.password == senha) {
            setEmail("")
            setSenha("")
            navigate(`${usuario.id}/user`)
        }
    })
    setUsuarioExistente(false)

  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          <span>
            <img src={Icon1} alt="" />
          </span>
          <input
            type="email"
            name="usuario"
            id="usuario"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>
            <img src={Icon2} alt="" />
          </span>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </label>
        {!usuarioExistente && <span>Usuário inexistente</span>}

        <span>Esqueceu sua senha? Recupere aqui!</span>
        <button type="submit">ENTRAR</button>
        <span>
          Não tem conta? <Link to="/register">Cadastre-se</Link> agora
        </span>
      </form>
    </div>
  );
};

export default Login;
