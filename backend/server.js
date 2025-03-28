const express = require('express');
const cors = require('cors');

const app = express();
app.use (cors());
app.use (express.json());

const items = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'},
    {id: 3, name: 'item 3'},
    {id: 4, name: 'item 4'},
]

// GET: retrieve all items
app.get("/api/items", (req, res) => {
    res.json(items);
});

//POST: add new items to the items
app.post("/api/items", (req, res) => {
    const newItem = {id: items.length + 1, name: req.body.name};
    items.push(newItem);
    res.status(201).json(newItem);
});

//PUT: update the items
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({massage: 'Item not founs'});
    item.name = req.body.name;
    res.json(item);
});

// DELETE: delete an item
app.delete('/api/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({massage: 'Item not found'});
    items.splice(index, 1);
    res.json({massage: ' Item deleted'});
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running  on ${PORT}`));