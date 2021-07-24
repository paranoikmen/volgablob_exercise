import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const Table = () => {

    const history = useHistory()
    const [data, setData] = useState([])
    const [finder, setFinder] = useState("")
    const [pages, setPages] = useState({
        currentPage: 0,
        maxPage: 0,
    })

    const fetchDataFind = async () => {
        const response = await fetch(`http://localhost:4000/posts/comments/${(pages.currentPage + 1) * 3 - 3}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: finder
        })
        if(response.ok) {
            const dataTable = await response.json()
            setData(dataTable.hits)
            if(pages.maxPage !== dataTable.total.value/3) {
                setPages(prev => ({
                    ...prev,
                    currentPage: 0,
                    maxPage: dataTable.total.value / 3
                }))
            }
        }
    }

    useEffect(() => {
        fetchDataFind()
    }, [pages.currentPage])

    const changePage = (event) => {
        setPages(prev => ({
            ...prev,
            currentPage: event.target.textContent - 1
        }));
    }

    const pagesButtons = () => {
        const page = []
        for (let i = 0; i < pages.maxPage; i++) {
            page.push(
                <button onClick={event => changePage(event)}>{i + 1}</button>)
        }
        return page
    }

    const rowTable = () => {
        return <>
            {
                data.length === 0
                    ? null
                    :
                    data.map((cell) =>
                        <tr>
                            <td>{cell._id}</td>
                            <td>{cell['_source']['postId']}</td>
                            <td>{cell['_source']['name']}</td>
                            <td>{cell['_source']['email']}</td>
                            <td>{cell['_source']['body']}</td>
                        </tr>
                    )
            }
        </>
    }

    const handleRow = (event) => {
        const rowId = event.target.parentNode.rowIndex + (pages.currentPage * 3)
        history.push(`/comments/${rowId}`)
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Найти..." value={finder} onChange={e => setFinder(e.target.value)}/>
                <button onClick={fetchDataFind}>Поиск</button>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>postId</th>
                        <th>name</th>
                        <th>email</th>
                        <th>body</th>
                    </tr>
                    </thead>
                    <tbody onClick={event => handleRow(event)}>
                    {rowTable()}
                    </tbody>
                </table>
                <div>
                    {pagesButtons()}
                    current page: {Number.parseInt(pages.currentPage) + 1}
                </div>
            </div>
        </div>
    );
};

export default Table;