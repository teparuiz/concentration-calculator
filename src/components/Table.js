import React, { useState } from "react";

function Table() {
  const [concentration, setConcentration] = useState(0);
  const [response, setResponse] = useState(0);
  const [saveData, setSaveData] = useState([]);
  const [mediaConcentration, setMediaConcentration] = useState([])
  const [mediaResponse, setMediaResponse] = useState([])
  const [m, setM] = useState('')
  const [b, setB] = useState('')

  const _save = (e) => {
    e.preventDefault();
    if (concentration !== 0 && response !== 0) {
      // Verifica si ambos inputs tienen datos
      setSaveData([...saveData, { concentration, response }]); // Guarda los datos en saveData
      setConcentration(''); // Limpia el input de concentración
      setResponse(''); // Limpia el input de respuesta
    }
  };

  const _average = () => {
    let sumConcentration = 0;
    let sumResponse = 0;
  
    if (saveData && saveData.length > 0) {
      saveData.forEach(item => {
        sumConcentration += item.concentration || 0;
        sumResponse += item.response || 0;
      });
    }
  
    const averageConcentration = sumConcentration / (saveData ? saveData.length : 1);
    setMediaConcentration([averageConcentration]);
  
    const averageResponse = sumResponse / (saveData ? saveData.length : 1);
    setMediaResponse([averageResponse]);
  
    setM( ((averageResponse * sumConcentration) - (averageConcentration * sumResponse)) /
      (sumConcentration * sumConcentration - (saveData ? saveData.length : 1) * sumConcentration * sumConcentration))
    
    setB(averageResponse - (m * averageConcentration))
  }
  return (
    <div>
      <h1> Añade tus datos </h1>
      <table>
        <thead>
          <tr>
            <th> Concentración </th>
            <th> Respuesta </th>
          </tr>
        </thead>
        <tbody>
          {saveData.map((item, index) => (
            <tr key={index}>
              <td>{item.concentration}</td>
              <td>{item.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="number"
        value={concentration}
        onChange={(e) => setConcentration(parseInt(e.target.value))}
      ></input>
      <input
        type="number"
        value={response}
        onChange={(e) => setResponse(parseInt(e.target.value))}
      ></input>
      <button onClick={_save}> Añadir dato </button>
      <div>
        <button onClick={_average}> Calcular medias </button>
        <p> {mediaConcentration }</p>
        <p> {mediaResponse} </p>
        <p> La ecuación de la recta es: y = {m}x + {b} </p>
      </div>
    </div>
  );
}

export default Table;
