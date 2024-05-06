import PropTypes from "prop-types";

const ChangeInfoModal = ({
  verifyPassword,
  setVerifyPassword,
  handleConfirmSave,
  error,
}) => {
    //Retornando página
  return (
    <div>
      <div>
        <h2>Confirme sua senha</h2> {/*Input para confirmar senha*/}
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
          className="btn btn-primary btn-block mt-2"
        >
          Confirmar
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
  error: PropTypes.string,
};

//Exportando página
export default ChangeInfoModal;
