import './App.css';
import Header from './components/Header';
import Bookmark from './components/Bookmark';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({title:"", url:""})

  const handleChange = (e) => {
    const currentForm = {...formData};
    currentForm[e.target.name] = e.target.value;
    setFormData(currentForm);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://bookmarked-app-backend.onrender.com/bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log('Data saved:', data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
  

  useEffect(() => {
    // Fetch data from your Express API
    fetch('https://bookmarked-app-backend.onrender.com/bookmark')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      < Header /> 
      <form onSubmit={handleSubmit}>
        <h4>Add a new bookmark</h4>
        <input placeholder='website' name='title' onChange={handleChange}></input>
        <input placeholder='http://' name='url' onChange={handleChange}></input>
        <button>Add!</button>
      </form>
      {data.map((bookmark, i) => {
        return  < Bookmark data={bookmark} key={i}/>
      })}
    
    </div>
  );
}

export default App;
