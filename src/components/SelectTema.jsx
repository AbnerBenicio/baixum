import { useEffect, useState } from "react";
import API_2 from "../api/api2";
import PropTypes from "prop-types"

const SelectTema = ({ tema, handleMudaTema }) => {
    
    const [temas, setTemas] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
          const res = await API_2.get(`/tema`);
          setTemas(res.data);
        };
    
        fetchApi();
      }, []);

  return (
    <select value={tema} name="tema" onChange={handleMudaTema}>
      <option value="">Selecione...</option>
      {temas && temas.map( currentTema => (
        <option key={currentTema.id} value={currentTema.tema}>{currentTema.titulo}</option>
      ))}
      
    </select>
  );
};

SelectTema.propTypes = {
    tema: PropTypes.string,
    handleMudaTema: PropTypes.func
  }

export default SelectTema;
