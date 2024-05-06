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
    <div>
      <h2>Esqueceu a sua senha? Recupere-a preenchendo o formulario abaixo!</h2> {/*Apresentação da página*/}
      {/*Formulário para recuperação da senha*/}
      <form onSubmit={handleSubmit}>
        <label> {/*Input para nome*/}
          <input
            value={nome}
            name="nome"
            type="text"
            placeholder="Digite seu nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label> {/*Input para email*/}
          <input
            value={email}
            name="nome"
            type="email"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button type="submit">Recuperar</button> {/*Botão para submeter formulário*/}
      </form>

      {/*Exibindo informação
        - Se usuário foi achado, exibe senha
        - Se usuário não foi achado, informa ao usuário
      */}
      {exibirInfo && (
        <h4>
          {senha != ""
            ? `Sua senha é: ${senha}`
            : "Não existe usuário com essas informações"}
        </h4>
      )}
    </div>
  );
};

//Exportando página
export default RecoverPassword;
