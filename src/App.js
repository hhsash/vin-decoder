import { useEffect, useRef, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import './App.css';
import VinSearch from './components/VinSearch';
import VehicleVariables from './components/VehicleVariables';
import Header from './components/Header';
import VariableItem from './components/VariableItem';

function App() {
  const [searchVin, setSearchVin] = useState('')
  const [vinData, setVinData] = useState([])
  const [variablesData, setVariablesData] = useState([])
  const [recentlyVin, setRecentlyVin] = useState([[]])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isVariableLoading, setIsVariableLoading] = useState(false)
  const [error, setError] = useState(false)
  const respMessage = useRef('')
  const errorSearchMessage = useRef('')
  const errorVariableMessage = useRef('')
  
  //Получаем переменные и описания из API
  useEffect(() => {
    setIsVariableLoading(true)
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json')
    .then(resp => resp.json())
    .then((json) => {
      setVariablesData(json.Results)
      setIsVariableLoading(false)
    })
    .catch((error) => {
      errorVariableMessage.current = 'Error with getting variable list! Error: ' + error
      setIsVariableLoading(false)
    })
  }, [])

  //Получаем недавние VIN из localstorage
  useEffect(() => {
    setRecentlyVin(localStorage.recentlyVin ? JSON.parse(localStorage.getItem('recentlyVin')) : [])
  }, [])

  //Функция расшифровки VIN
  const onVinDecode = () => {
    setIsSearchLoading(true)
    setError(false)
    setVinData([])
    respMessage.current = ''
    if(searchVin.length === 17) {
      //Отправляем запрос с VIN-кодом
      fetch('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/' + searchVin + '?format=json')
      .then(resp => resp.json())
      .then((json) => {
        //Заносим массив Results в отдельную переменную
        const arr = json.Results
        //Убираем все элементы массива, в которых присутствуют значение '' или null
        const respData = arr.filter((item) => item.Value !== '' && item.Value !== null)
        respMessage.current = json.Message
        setIsSearchLoading(false)
        setVinData(respData)
        //Получаем недавние VIN из localstorage
        const oldRecently = localStorage.recentlyVin ? JSON.parse(localStorage.getItem('recentlyVin')) : []
        if(oldRecently.includes(searchVin)) {
          let newRecently = oldRecently.filter(item => item !== searchVin)
          newRecently.unshift(searchVin)
          localStorage.setItem('recentlyVin', JSON.stringify(newRecently))
          setRecentlyVin(newRecently)
        } else if(oldRecently.length < 5) {
          //Создаём массив с новым VIN-кодом 
          const newRecently = [searchVin, ...oldRecently]
          //Добавляем новый массив в localstorage 
          localStorage.setItem('recentlyVin', JSON.stringify(newRecently))
          setRecentlyVin(newRecently)
        } else {
          /*Если количество элементов в localstorage равняется 5, удаляем последний элемент
            и добавляем searchVin в начало массива*/ 
          oldRecently.pop()
          localStorage.setItem('recentlyVin', JSON.stringify([searchVin, ...oldRecently]))
          setRecentlyVin([searchVin, ...oldRecently])
        }
      })
      .catch((error) => {
        setIsSearchLoading(false)
        errorSearchMessage.current = 'Error with getting VIN-data! Error: ' + error
        setError(true)
      })
    } else {
      setIsSearchLoading(false)
      errorSearchMessage.current = 'Enter the correct VIN!'
      setError(true)
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = '/' element = {<Header title={'VIN Decoder'} />}>
        <Route index element = {
          <VinSearch 
            searchVin = {searchVin}
            setSearchVin = {setSearchVin}
            onVinDecode = {onVinDecode}
            vinData = {vinData} 
            recentlyVin = {recentlyVin}
            isLoading = {isSearchLoading}
            respMessage = {respMessage.current}
            error={error}
            errorMessage = {errorSearchMessage.current}
          />
        }/>
        <Route 
          path = '/variables' 
          element = {
            <VehicleVariables  
              variables = {variablesData} 
              isLoading = {isVariableLoading}
              error = {error}
              errorMessage = {errorVariableMessage.current}
            />
          }
        />
        <Route 
          path='/variables/:id'
          element={
            <VariableItem 
              variables = {variablesData} 
            />
          }
        />
      </Route>
    )
  )
  
  return (
    <div className="App">
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
