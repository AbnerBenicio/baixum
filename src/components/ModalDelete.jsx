import PropTypes from "prop-types";
import "../styles/custom.css";

const ModalDelete = ({ titulo, setModalOpen, handleDelete }) => {
  return (
    <div
      className="position-fixed d-flex flex-column align-items-center justify-content-center z-index-high"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "RGBA(0, 0, 0, 0.5)",
      }}
    >
      <div className="bg-white p-3" style={{height: "12em", width: "25rem"}}>
        <h3 className="fw-normal">Tem certeza que deseja excluir o artigo {titulo}?</h3>
        <button className="btn btn-primary me-3" onClick={handleDelete}>
          SIM
        </button>
        <button className="btn btn-danger" onClick={() => setModalOpen(false)}>
          NÃO
        </button>
      </div>
    </div>
  );
};

//Definindo tipos das props
ModalDelete.propTypes = {
  titulo: PropTypes.string,
  setModalOpen: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ModalDelete;
