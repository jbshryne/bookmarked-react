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
      <div>
        <a href={data.url}>{data.title}</a>
      </div>
      <div>
        <button onClick={handleUpdate}>Edit</button>
        <button onClick={(e) => handleDelete(e)} value={data._id}>
          X
        </button>
      </div>
    </div>
  );
};

export default Bookmark;
