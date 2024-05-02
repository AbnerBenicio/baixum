import Icon1 from "../assets/user.png";
import Icon2 from "../assets/lock.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

const Login = () => {
  //Definindo variáveis para o formulário
  const [usuarios, setUsuarios] = useState();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioExistente, setUsuarioExistente] = useState(true)
  const navigate = useNavigate()

  //Buscando usuários
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get("user");
      setUsuarios(res.data);
    };

    fetchApi();
  }, []);

  //Função para submeter o formulário
  const handleSubmit = (e) => {
    //Prevenindo atualização de página ao enviar formulario
    e.preventDefault();
    
    //Mapeando usuários e verificando se usuário informado existe
    usuarios.map((usuario) => {
        if(usuario.email == email && usuario.password == senha) {
            //Se existir, limpa estados e vai para tela inicial
            setEmail("")
            setSenha("")
            if (usuario.adm) {
              navigate(`${usuario.id}/admin`)
            } else {
              navigate(`${usuario.id}/user`)
            }
            
        }
    })
    //Define que usuário não existe
    setUsuarioExistente(false)

  };

  //Retornando página
  return (
    <div className="login-container">
      {/*Formulário para login*/}
      <form onSubmit={handleSubmit}>
        {/*Campo de email*/}
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
          {/*Campo de senha*/}
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

        {/*Informando que usuário não existe*/}
        {!usuarioExistente && <span>Usuário inexistente</span>}

        {/*Link para recuperação de senha*/}
        <span>Esqueceu sua senha? <Link to="/recover-password">Recupere aqui!</Link></span>
        {/*Botão para login*/}
        <button type="submit">ENTRAR</button>
        {/*Link para cadastro de usuário*/}
        <span>
          Não tem conta? <Link to="/register">Cadastre-se</Link> agora
        </span>
      </form>
    </div>
  );
};

//Exportando página
export default Login;
