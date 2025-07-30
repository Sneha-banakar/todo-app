import React, { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');
  const [editId, setEditId] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      setLoggedIn(true);
      setLoginError('');
      fetchItems();
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/items');
    const data = await res.json();
    setItems(data);
  };

  const handleCreate = async () => {
    const res = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });
    const newItem = await res.json();
    setItems(prev => [...prev, newItem]);
    setNewText('');
  };

  const handleEdit = async (id, text) => {
    const res = await fetch(`http://localhost:5000/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    setItems(prev => prev.map(item => (item.id === id ? updated : item)));
    setEditId(null);
    setNewText('');
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(item => item.id !== id));
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Todo List</h2>
      <input
        value={newText}
        onChange={e => setNewText(e.target.value)}
        placeholder="Enter item text"
      />
      <button onClick={() => editId ? handleEdit(editId, newText) : handleCreate()}>
        {editId ? 'Update' : 'Add'}
      </button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => {
              setEditId(item.id);
              setNewText(item.text);
            }}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
