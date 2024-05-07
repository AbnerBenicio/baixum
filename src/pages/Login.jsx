import Icon1 from "../assets/user.png";
import Icon2 from "../assets/lock.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import Logo from "../assets/BaixiumLogo.png"

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
    <div>
    <img
      src={Logo}
      alt="Descrição da imagem"
      style={{ width: '50%', height: '50%' }}
    />
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="card bg-light text-center">
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          {/* Formulário para login */}
          <form onSubmit={handleSubmit}>
            {/* Campo de email */}
            <div className="input-group flex-nowrap mb-4">
              <span className="input-group-text" id="addon-wrapping">
                <img src={Icon1} alt="" />
              </span>
              <input
                type="email"
                name="usuario"
                id="usuario"
                className="form-control"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* Campo de senha */}
            <div className="input-group flex-nowrap mb-4">
              <span className="input-group-text" id="addon-wrapping">
                <img src={Icon2} alt="" />
              </span>
              <input
                type="password"
                name="senha"
                id="senha"
                className="form-control"
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />
            </div>

            {/* Informando que usuário não existe */}
            {!usuarioExistente && <span className="text-danger">Usuário inexistente</span>}

            {/* Links em uma coluna */}
            <div className="d-flex flex-column align-items-center">
              {/* Link para recuperação de senha */}
              <span className="mt-2 mb-2">
                Esqueceu sua senha? <Link to="/recover-password" className="btn btn-link">Recupere aqui!</Link>
              </span>

              {/* Botão para login */}
              <button type="submit" className="btn btn-primary btn-block mb-2">ENTRAR</button>
              
              {/* Link para cadastro de usuário */}
              <span className="mt-2">
                Não tem conta? <Link to="/register" className="btn btn-link">Cadastre-se</Link> agora
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>

  );
};

//Exportando página
export default Login;
