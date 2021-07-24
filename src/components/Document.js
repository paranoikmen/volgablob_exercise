import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";

const Document = () => {

    const {id} = useParams();
    const history = useHistory()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/posts/comments/comment/${id}`)
            const dataComment = await response.json()
            setData(dataComment)
        }
        fetchData()
    }, [])

    const handleBack = () => {
        history.goBack()
    }

    return (
        <div>
            <button onClick={handleBack}>
                Назад
            </button>
            <h2>id comment: {id}</h2>
            <ul>
                {
                    data.length !== 0
                        ?
                        Object.keys(data[0]["_source"]).map(value =>
                            <li key={value}>
                                {value}: {data[0]["_source"][value]}
                            </li>)
                        :
                        <div>Что-то пошло не так :(</div>
                }
            </ul>
        </div>

    );
};

export default Document;