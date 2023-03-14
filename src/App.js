import { useEffect, useRef, useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import VinSearch from "./components/VinSearch";
import VehicleVariables from "./components/VehicleVariables";
import Header from "./components/Header";
import VariableItem from "./components/VariableItem";
import NotFound from "./components/NotFound";
import { useCallback } from "react";

function App() {
    const [searchVin, setSearchVin] = useState("");
    const [vinData, setVinData] = useState([]);
    const [variablesData, setVariablesData] = useState([]);
    const [recentlyVin, setRecentlyVin] = useState(
        localStorage.recentlyVin
            ? JSON.parse(localStorage.getItem("recentlyVin"))
            : []
    );
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isVariableLoading, setIsVariableLoading] = useState(true);
    const [error, setError] = useState(null);
    const respMessage = useRef("");

    //Получаем переменные и описания из API
    const getData = useCallback(async () => {
        try {
            const resp = await fetch(
                "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json"
            );
            const data = await resp.json();
            setVariablesData(data.Results);
            setIsVariableLoading(false);
        } catch (error) {
            setError(error);
            setIsVariableLoading(false);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    //Получаем недавние VIN из localstorage
    useEffect(() => {
        setRecentlyVin(
            localStorage.recentlyVin
                ? JSON.parse(localStorage.getItem("recentlyVin"))
                : []
        );
    }, []);

    //Функция расшифровки VIN
    const onVinDecode = () => {
        setIsSearchLoading(true);
        setError(false);
        setVinData([]);
        respMessage.current = "";
        const regexp = /[A-HJ-NPR-Z0-9]{17}/;
        if (regexp.test(searchVin)) {
            //Отправляем запрос с VIN-кодом
            fetch(
                "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/" +
                    searchVin +
                    "?format=json"
            )
                .then((resp) => resp.json())
                .then((json) => {
                    //Заносим массив Results в отдельную переменную
                    const arr = json.Results;
                    //Убираем все элементы массива, в которых присутствуют значение '' или null
                    const respData = arr.filter(
                        (item) => item.Value !== "" && item.Value !== null
                    );
                    respMessage.current = json.Message;
                    setIsSearchLoading(false);
                    setVinData(respData);
                    //Получаем недавние VIN из localstorage
                    const oldRecently = localStorage.recentlyVin
                        ? JSON.parse(localStorage.getItem("recentlyVin"))
                        : [];
                    if (oldRecently.includes(searchVin)) {
                        let newRecently = oldRecently.filter(
                            (item) => item !== searchVin
                        );
                        newRecently.unshift(searchVin);
                        localStorage.setItem(
                            "recentlyVin",
                            JSON.stringify(newRecently)
                        );
                        setRecentlyVin(newRecently);
                    } else if (oldRecently.length < 5) {
                        //Создаём массив с новым VIN-кодом
                        const newRecently = [searchVin, ...oldRecently];
                        //Добавляем новый массив в localstorage
                        localStorage.setItem(
                            "recentlyVin",
                            JSON.stringify(newRecently)
                        );
                        setRecentlyVin(newRecently);
                    } else {
                        /*Если количество элементов в localstorage равняется 5, удаляем последний элемент
            и добавляем searchVin в начало массива*/
                        oldRecently.pop();
                        localStorage.setItem(
                            "recentlyVin",
                            JSON.stringify([searchVin, ...oldRecently])
                        );
                        setRecentlyVin([searchVin, ...oldRecently]);
                    }
                })
                .catch((error) => {
                    setIsSearchLoading(false);
                    setError(true);
                });
        } else {
            setIsSearchLoading(false);
            setError(true);
        }
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Header title={"VIN Decoder"} />}>
                <Route
                    index
                    element={
                        <VinSearch
                            searchVin={searchVin}
                            setSearchVin={setSearchVin}
                            onVinDecode={onVinDecode}
                            vinData={vinData}
                            recentlyVin={recentlyVin}
                            isLoading={isSearchLoading}
                            respMessage={respMessage.current}
                            error={error}
                            setError={setError}
                        />
                    }
                />
                <Route
                    path="/variables"
                    element={
                        <VehicleVariables
                            variables={variablesData}
                            isLoading={isVariableLoading}
                            error={error}
                            setError={setError}
                        />
                    }
                />
                <Route
                    path="/variables/:id"
                    element={<VariableItem variables={variablesData} />}
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
