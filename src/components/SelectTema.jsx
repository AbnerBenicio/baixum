import { useEffect, useState } from "react";
import API from "../api/api4";
import PropTypes from "prop-types";

const SelectTema = ({ tema, handleMudaTema }) => {
  //Definindo variável de temas
  const [temas, setTemas] = useState([]);
  const emptyGuid = "00000000-0000-0000-0000-000000000000";

  //Buscando temas
  useEffect(() => {
    const fetchApi = async () => {
      const res = await API.get(`/temas`);
      setTemas(res.data);
    };

    fetchApi();
  }, []);

  //Retornando selecionador de temas
  return (
    <select
      className="form-select"
      value={tema}
      name="tema"
      onChange={handleMudaTema}
    >
      {/*Opção neutra*/}
      <option value={emptyGuid}>Selecione...</option>
      {/*Mapeando temas para exibir*/}
      {temas?.map((currentTema) => (
        <option key={currentTema.id} value={currentTema.id}>
          {currentTema.titulo}
        </option>
      ))}
    </select>
  );
};

//Definindo tipos dadas props
SelectTema.propTypes = {
  tema: PropTypes.string,
  handleMudaTema: PropTypes.func,
};

//Exportando componente
export default SelectTema;
