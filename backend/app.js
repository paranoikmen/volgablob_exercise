const express = require('express');
const elasticsearch = require('elasticsearch')
const request = require('request')

const app = express();

const client = new elasticsearch.Client({
    host: 'localhost:9200'
})

app.use(express.json());

app.get('/data', (req, res) => {
    request.get({
        url: 'https://jsonplaceholder.typicode.com/comments'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body)
            client.index({
                index: 'test',
                type: 'test',
                body: {
                    abs: "dada",
                    bca: 'asd',
                }
            },)
            res.send(info)
        } else console.log(error);
    })

})

app.get('/test', (req, res) => {
    client.get({
        index: 'test',
        type: 'test',
        id: 1
    }, function (error, response, status) {
        if(error) {
            res.send(error)
        }
        else {
            res.send(response);
        }
    })
})

app.listen(4000, () => {
    console.log("Server started")
})



