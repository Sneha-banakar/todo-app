const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, text: 'Sample item 1' },
  { id: 2, text: 'Sample item 2' },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), text: req.body.text };
  items.push(newItem);
  res.json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === itemId);
  if (index !== -1) {
    items[index].text = req.body.text;
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.json({ message: 'Item deleted' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
