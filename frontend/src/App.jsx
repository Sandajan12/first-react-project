import React, {useEffect, useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

function App(){
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");


  //fetch item from API

  useEffect(() =>{
    axios
      .get(API_URL)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error Fecthing Item:", error));
  }, []);

  //add item to API
  const addItem = () =>{
    axios
    .post(API_URL, {name: newItem})
    .then(response => setItems([...items, response.data]))
    .catch(error => console.error("Error Adding item:", error));
  };

//Update  
  const updateItem = (id, name) =>{
  axios
  .put(`${API_URL}/${id}`, { name })
  .then(response => {
    setItems(items.map(item => (item.id === id ? response.data : item)));
  })
  .catch(error => console.error("Error Updating item:", error));
  };

//Delete
  const deleteItem = (id) =>{
    axios
    .delete(`${API_URL}/${id}`)
    .then(() => {
      setItems(items.filter(item => item.id !== id));
    })
    .catch(error => console.error("Error Deleting item:", error));
  }; 

  return (
    <div>
      <h1>React + Express REST API</h1>
      <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new item"/>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items && items.map(item => (
          <li key={item.id}>
            <input type="text" value={item.name} onChange={(e) => updateItem(item.id, e.target.value)}/>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App;