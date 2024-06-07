import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon2 from "../assets/lock.png";
import API from "../api/api4";
import ChangeInfoModal from "../components/ChangeInfoModal";

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const { usuarioID } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await API.get(`usuarios/${usuarioID}`);
        setUsuario(res.data);
        if (res.data) {
          setName(res.data.nome);
          setEmail(res.data.email);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchApi();
  }, [usuarioID]);

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Verificar se todas as informações estão preenchidas antes de exibir o modal
    if (name && email && password) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
      alert("Preencha todas as informações antes de salvar.");
    }
  };

  const handleConfirmSave = async () => {
    try {
      await API.post("/login", {
        email: usuario.email,
        password: verifyPassword,
      });
      setError("");
      const updatedUser = {
        ...usuario,
        nome: name.toUpperCase(),
        email,
        password,
      };
      await API.put(`usuarios/${usuarioID}`, updatedUser);
      setModalVisible(false);
      alert("Informações alteradas com sucesso! Faça login novamente.");
      navigate("/"); //redireciona para tela de login
    } catch (err) {
      setError("Senha incorreta. Digite novamente sua senha.");
      setVerifyPassword("");
    }
  };

  return (
    <div>
      <div className="container h-100 d-flex justify-content-center align-items-center margin-top-200">
        <div className="card bg-light text-center">
          <div className="card-body d-flex flex-column align-items-center justify-content-center">
            {/* Formulário de perfil */}
            <form onSubmit={handleSaveClick}>
              {/* Campo de nome */}
              <div className="input-group flex-nowrap mb-4">
                <span className="input-group-text" id="addon-wrapping">
                  Nome
                </span>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="form-control"
                  placeholder="Digite seu nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  disabled={modalVisible}
                />
              </div>

              {/* Campo de email */}
              <div className="input-group flex-nowrap mb-4">
                <span className="input-group-text" id="addon-wrapping">
                  @
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={modalVisible}
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
                  placeholder="Digite sua nova senha"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={modalVisible}
                />
              </div>

              {/* Botão para salvar */}
              <button type="submit" className="btn btn-primary btn-block mb-2">
                Salvar Alterações
              </button>
            </form>

            {/* Modal de confirmação */}
            {modalVisible && (
              <ChangeInfoModal
                verifyPassword={verifyPassword}
                setVerifyPassword={setVerifyPassword}
                handleConfirmSave={handleConfirmSave}
                setModalVisible={setModalVisible}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//Exportando página
export default Profile;
