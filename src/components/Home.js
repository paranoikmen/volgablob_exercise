import React, {useState} from 'react';
import Table from "./Table";

const Home = () => {

    const [table, setTable] = useState(false)
    const [json, setJson] = useState(false)
    const [jsonData, setJsonData] = useState([])

    const handleTable = () => {
        if(table) {
            setTable(false)
        }
        else {
            setTable(true)
            setJson(false)
        }
    }

    const handleJson = () => {
        if(json) {
            setJson(false)
        }
        else {
            setJson(true)
            setTable(false)
            fetchJson()
        }
    }

    const fetchJson = async () => {
        const response = await fetch(`http://localhost:4000/posts`)
        const dataJson = await response.json()
        setJsonData(dataJson)
    }

    return (
        <div>
            <div>
                <button onClick={handleJson}>Вывести JSON</button>
                <button onClick={handleTable}>Вывести таблицу</button>
                <div style={json ? null : {display: "none"}}>
                    {JSON.stringify(jsonData)}
                </div>
                <div style={table ? null : {display: "none"}}>
                    <Table />
                </div>

            </div>

        </div>
    );
};

export default Home;