import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import API from '../api/api';

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const { usuarioID } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await API.get(`user/${usuarioID}`);
        setUsuario(res.data);
        if (res.data) {
          setName(res.data.name);
          setEmail(res.data.email);
          setPassword(res.data.password);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchApi();
  }, [usuarioID]);

  const handleSaveClick = () => {
    // Verificar se todas as informações estão preenchidas antes de exibir o modal
    if (name && email && password) {
      setModalVisible(true);
    } else {
      setError('Preencha todas as informações antes de salvar.');
    }
  };

  const handleConfirmSave = () => {
    if (verifyPassword === usuario?.password) {
      setError('');
      const updatedUser = {
        ...usuario,
        name: name.toUpperCase(),
        email,
        password,
      };
      API.put(`user/${usuarioID}`, updatedUser);
      setModalVisible(false);
      alert("Informações alteradas com sucesso! Faça login novamente.");
      navigate("/"); //redireciona para tela de login
      
    } else {
      setError('Senha incorreta. Digite novamente sua senha.');
      setVerifyPassword('');
    }
  };

  return (
    <div>
      <h1>Perfil</h1>
      <form>
        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      </form>
      <button onClick={handleSaveClick}>Salvar</button>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirme sua senha</h2>
            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} /><br />
            <button onClick={handleConfirmSave}>Confirmar</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;