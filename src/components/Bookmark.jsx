import React from 'react';

const Bookmark = ({ data, handleDeleteBookmark, setIdToUpdate }) => {
  const handleDelete = (e) => {
    const id = e.target.value;
    return handleDeleteBookmark(id);
  };

  const handleUpdate = () => {
    // Call the setIdToUpdate function from props to set the ID for editing
    setIdToUpdate(data._id);
  };

  return (
    <div>
      {data.title}
      <button onClick={(e) => handleDelete(e)} value={data._id}>X</button>
      <button onClick={handleUpdate}>Edit</button>
    </div>
    
  );
};

export default Bookmark;
