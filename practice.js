import express from 'express'
const app = express()

// console.clear()

const port = 3000;

app.use(express.json())

let teaData = [];
let nextId = 1;

app.get('/tea', (req, res) => {
    res.status(200).send(teaData)
})

app.post('/tea', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea)
})

app.get('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea)
})

app.put('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    const { name, price } = req.body;

    if (!tea) {
        return res.status(404).send('tea not found')
    }
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea)
})

app.delete('/tea/:id', (req, res) => {
    teaData.splice(teaData.findIndex(t => t.id === parseInt(req.params.id)), 1)
    res.status(204).send('Tea Deleted')
})

app.listen(port, () => {
    console.log('server running')
})