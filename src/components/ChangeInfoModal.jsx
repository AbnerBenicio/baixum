import PropTypes from "prop-types";

const ChangeInfoModal = ({
  verifyPassword,
  setVerifyPassword,
  handleConfirmSave,
  setModalVisible,
  error,
}) => {
    //Retornando página
  return (
    <div>
      <div>
        <h6>Digite a sua senha atual<br/>para confirmar as mudanças</h6> {/*Input para confirmar senha*/}
        <input
          type="password"
          name="verifyPassword"
          id="verifyPassword"
          className="form-control"
          placeholder="Confirme sua senha"
          onChange={(e) => setVerifyPassword(e.target.value)}
          value={verifyPassword}
        />
        {/*Botão para confirmar senha*/}
        <button
          onClick={handleConfirmSave}
          className="btn btn-primary btn-block mt-2 me-2"
        >
          Confirmar
        </button>
        <button
          onClick={() => setModalVisible(false)}
          className="btn btn-danger btn-block mt-2"
        >
          Cancelar
        </button>
        {/*Mensagem de erro*/}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}; //Definindo tipos das props
ChangeInfoModal.propTypes = {
  verifyPassword: PropTypes.string,
  setVerifyPassword: PropTypes.func,
  handleConfirmSave: PropTypes.func,
  setModalVisible: PropTypes.func,
  error: PropTypes.string,
};

//Exportando página
export default ChangeInfoModal;
