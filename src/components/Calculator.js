import { useState } from "react";
import Table from '../components/Table'

function Calculator() {
  const [equis, setEquis] = useState(0);
  const [ye, setYe] = useState(0);
  const [pendient, setPendient] = useState(0);
  const [calculating, setCalculating] = useState([]);

  const calculate = (e) => {
    e.preventDefault();
    const result = (ye - equis) / pendient;
    setCalculating([result]);
  };

  const _reset = (e) => {
    e.preventDefault()
    setEquis(0)
    setYe(0)
    setPendient(0)
    setCalculating([]);
  };

  const _getDisabled = () => {
    let disabled = false
    if (!ye || !pendient) disabled = true;
    return disabled
  }

  return (
    <div>
      <h1>Calculadora de concentraciones</h1>
      <h2> Ecuación de la recta </h2>
      {calculating.length === 0 ? (<p> y = mx + b </p>) :
      (<p> {ye} = {pendient}x + {equis} </p>)}
      <form>
        <input
          type="number"
          value={pendient}
          onChange={(e) => setPendient(e.target.value)}
          placeholder="Agrega la pendiente a"
          name="a"
        ></input>
        <input
          type="number"
          value={equis}
          onChange={(e) => setEquis(e.target.value)}
          placeholder="Agrega la constante b"
        ></input>
        <input
          type="number"
          value={ye}
          onChange={(e) => setYe(e.target.value)}
          placeholder="Agrega el valor y"
        ></input>
        <div>
        <button onClick={calculate} disabled={_getDisabled()}className="mr-2">Calcula</button>
        <button onClick={_reset}>Reiniciar</button>
        </div>

    
      </form>
      <div>
        <p> Resultados </p>
       {calculating}
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}

export default Calculator;
