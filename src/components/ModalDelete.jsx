import PropTypes from "prop-types";

const ModalDelete = ({titulo, setModalOpen, handleDelete}) => {
  return (
    <div>
        <h3>Tem certeza que deseja excluir o artigo {titulo}?</h3>
        <button className="btn btn-primary me-3" onClick={handleDelete}>SIM</button>
        <button className="btn btn-danger" onClick={() => setModalOpen(false)}>NÃO</button>
    </div>
  )
}

//Definindo tipos das props
ModalDelete.propTypes = {
    titulo: PropTypes.string,
    setModalOpen: PropTypes.func,
    handleDelete: PropTypes.func,
};

export default ModalDelete