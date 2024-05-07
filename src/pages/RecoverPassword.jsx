import { useEffect, useState } from "react";
import API from "../api/api";

const RecoverPassword = () => {
  //Definindo variáveis
  const [usuarios, setUsuarios] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [exibirInfo, setExibirInfo] = useState(false);

  //Buscando usuários
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get("user");
      setUsuarios(res.data);
    };

    fetchApi();
  }, []);

  //Validação do formulário
  const handleSubmit = (e) => {
    //Evitando atualização da página
    e.preventDefault();
    //Limpando senha
    setSenha("");

    //Procurando usuário correspondente a informaações digitadas
    usuarios.map((usuario) => {
      //Verificando se usuário foi encontrado
      if (nome.toUpperCase() == usuario.name && email == usuario.email) {
        //Armazenando senha do usuário
        setSenha(usuario.password);
      }
    });

    //Habilitando exibição de informações
    setExibirInfo(true);
  };

  //Retorno da página
  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <img
        src="../src/assets/BaixiumLogo.png"
        alt="Logo"
        style={{ width: '50%', height: '50%', marginBottom: '20px' }}
      />
      <div className="card bg-light text-center">
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h2>Esqueceu a sua senha? Recupere-a preenchendo o formulário abaixo!</h2>

          {/* Formulário para recuperação da senha */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Digite seu nome</label>
              <input
                value={nome}
                name="nome"
                type="text"
                id="nome"
                className="form-control"
                placeholder="Digite seu nome"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
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

          {/* Exibindo informação
            - Se usuário foi achado, exibe senha
            - Se usuário não foi achado, informa ao usuário
          */}
          {exibirInfo && (
            <h4>
              {senha !== ""
                ? `Sua senha é: ${senha}`
                : "Não existe usuário com essas informações"}
            </h4>
          )}
        </div>
      </div>
    </div>

  );
};

//Exportando página
export default RecoverPassword;
