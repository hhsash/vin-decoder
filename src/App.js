import { useEffect, useRef, useState } from 'react';
import './App.css';
import VinSearch from './components/VinSearch';

function App() {

  const [vinData, setVinData] = useState([])
  const variableData = useRef([])

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/5UXWX7C5*BA?format=json')
    .then(resp => resp.json())
    .then((json) => {
      const arr = json.Results
      const respData = arr.filter((item) => item.Value !== '' && item.Value !== null)
    })
  }, [])

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json')
    .then(resp => resp.json())
    .then((json) => {
      variableData.current = json.Results
    })
  }, [])

  return (
    <div className="App">
      <VinSearch />
    </div>
  );
}

export default App;
