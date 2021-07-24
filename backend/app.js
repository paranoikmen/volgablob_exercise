const express = require('express');
const elasticsearch = require('elasticsearch')
const cors = require('cors');

const app = express();

const client = new elasticsearch.Client({
    host: 'localhost:9200'
})

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json());
app.use(express.text())

app.post('/posts/comments/:page', (req, res) => {
    let page = req.params.page
    page = page < 0 ? 0 : page
    let finder = req.body
    finder = finder.length === 0 ? null : finder
    client.search({
        index: 'posts',
        type: 'comments',
        from: page,
        size: 3,
        q: finder
    }, function (error, response, status) {
        if (error) {
            res.send(error);
        } else {
            res.send(response.hits);
        }
    })
})

app.get('/posts/comments/comment/:id', (req, res) => {
    const id = req.params.id
    client.search({
        index: 'posts',
        type: 'comments',
        body: {
            query: {
                match: {
                    _id: id
                }
            }
        }
    }, function (error, response, status) {
        if (error) {
            res.send(error);
        } else {
            res.send(response.hits.hits);
        }
    })
})

app.get('/posts', (req, res) => {
    client.search({
        index: 'posts',
    }, function (error, response, status) {
        if (error) {
            res.send(error);
        } else {
            res.send({value: response.hits.hits})
        }
    })
})


app.listen(4000, () => {
    console.log("Server started")
})



