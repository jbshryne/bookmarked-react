import React from "react";

const Bookmark = ({ data, handleDeleteBookmark, setIdToUpdate }) => {
  const handleDelete = (e) => {
    const id = e.target.value;
    return handleDeleteBookmark(id);
  };

  const handleUpdate = () => {
    setIdToUpdate(data._id);
  };

  return (
    <div className="bookmark">
      <a href={data.url}>{data.title}</a>
      <button onClick={(e) => handleDelete(e)} value={data._id}>
        X
      </button>
      <button onClick={handleUpdate}>Edit</button>
    </div>
  );
};

export default Bookmark;
