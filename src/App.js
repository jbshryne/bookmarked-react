import "./App.css";
import Header from "./components/Header";
import Bookmark from "./components/Bookmark";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [addForm, setAddForm] = useState({ title: "", url: "" });
  const [updateForm, setUpdateForm] = useState({ title: "", url: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState("");

  useEffect(() => {
    fetch("https://bookmarked-app-backend.onrender.com/bookmark")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  });

  const handleAddChange = (e) => {
    const currentForm = { ...addForm };
    currentForm[e.target.name] = e.target.value;
    setAddForm(currentForm);
  };

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

  const handleAddBookmark = (e) => {
    e.preventDefault();
    fetch("https://bookmarked-app-backend.onrender.com/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addForm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data saved:", data);
        setAddForm({ title: "", url: "" });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleUpdateBookmark = (e) => {
    e.preventDefault();

    const updatedData = {
      title: updateForm.title,
      url: updateForm.url,
    };

    fetch(
      `https://bookmarked-app-backend.onrender.com/bookmark/${idToUpdate}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((updatedBookmark) => {
        setData((prevData) =>
          prevData.map((bookmark) =>
            bookmark._id === idToUpdate ? updatedBookmark : bookmark
          )
        );

        setIsEditing(false);
        setIdToUpdate("");
        setUpdateForm({ title: "", url: "" });
      })
      .catch((error) => {
        console.log("Error updating:", error);
      });
  };

  const handleDeleteBookmark = (id) => {
    fetch(`https://bookmarked-app-backend.onrender.com/bookmark/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setData((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark._id !== id)
          );
        } else {
        }
      })
      .catch((error) => {
        console.log("Error deleting:", error);
      });
  };

  return (
    <div className="App">
      <Header />
      <div className="bookmarks-container">
        <form onSubmit={handleAddBookmark}>
          <h3>Add a new bookmark</h3>
          <input
            placeholder="website"
            name="title"
            onChange={handleAddChange}
            value={addForm.title}
          ></input>
          <input
            placeholder="http://"
            name="url"
            onChange={handleAddChange}
            value={addForm.url}
          ></input>
          <button>Add!</button>
        </form>
        <div className="bookmarks-container">
          {data.map((bookmark, i) => {
            return (
              <Bookmark
                data={bookmark}
                key={i}
                handleDeleteBookmark={handleDeleteBookmark}
                handleSetId={handleSetId}
              />
            );
          })}
        </div>
      </div>
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateBookmark}>
              <h3>Edit bookmark</h3>
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
              <button type="submit">Update!</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Nevermind!
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
