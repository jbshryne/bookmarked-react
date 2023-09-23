import './App.css';
import Header from './components/Header';
import Bookmark from './components/Bookmark';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({title:"", url:""})

  const [isEditing, setIsEditing] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState("")
  const [updateForm, setUpdateForm] = useState({title:"", url:""})

  const handleChange = (e) => {
    const currentForm = {...formData};
    currentForm[e.target.name] = e.target.value;
    setFormData(currentForm);
  }
  const handleUpdateChange = (e) => {
    const currentForm = { ...updateForm };
    currentForm[e.target.name] = e.target.value;
    setUpdateForm(currentForm);
  };

    const handleSetId = (id) => {
    
      const bookmarkToEdit = data.find((bookmark) => bookmark._id === id);
      if (bookmarkToEdit) {
        setUpdateForm({
          title: bookmarkToEdit.title,
          url: bookmarkToEdit.url,
        });
        setIdToUpdate(id);
        setIsEditing(true);
      }
    };

  const handleDeleteBookmark = (id) => {

    // Send a DELETE request to delete the bookmark by its unique identifier (id)
    fetch(`https://bookmarked-app-backend.onrender.com/bookmark/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted bookmark from your component's state
          setData((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark._id !== id)
          );
  
        } else {
 
        }
      })
      .catch((error) => {
      
      });
  };

  const handleUpdateBookmark = async () => {
    const updatedData = {
      title: updateForm.title,
      url: updateForm.url,
    };
  
    fetch(`https://bookmarked-app-backend.onrender.com/bookmark/${idToUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((updatedBookmark) => {

        setData((prevData) =>
          prevData.map((bookmark) =>
            bookmark._id === idToUpdate ? updatedBookmark : bookmark
          )
        );

        // Clear the edit mode
        setIsEditing(false);
        setIdToUpdate('');
        setUpdateForm({ title: '', url: '' });
      })
      .catch((error) => {
     
      });
  };

  

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
        <input placeholder='website' name='title' onChange={handleChange}  value={formData.title}></input>
        <input placeholder='http://' name='url' onChange={handleChange}  value={formData.url}></input>
        <button>Add!</button>
      </form>
      {data.map((bookmark, i) => {
  return (
<Bookmark
  data={bookmark}
  key={i}
  handleDeleteBookmark={handleDeleteBookmark}
  setIdToUpdate={handleSetId}
  isEditing={isEditing}
  handleUpdateBookmark={handleUpdateBookmark}

/>
  );
})}
{isEditing && (
  <form onSubmit={handleUpdateBookmark}>
    <h4>Edit Bookmark</h4>
    <input
      placeholder="website"
      name="title"
      value={updateForm.title}
      onChange={handleUpdateChange}
    ></input>
    <input
      placeholder="http://"
      name="url"
      value={updateForm.url}
      onChange={handleUpdateChange}
    ></input>
    <button type='submit'>Edit</button>
  </form>
)}
    </div>
  );
}

export default App; 