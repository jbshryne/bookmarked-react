import React from "react";

const Bookmark = ({ data, handleDeleteBookmark, handleSetId }) => {
  const id = data._id;

  const handleClickDelete = () => {
    handleDeleteBookmark(id);
  };

  const handleClickUpdate = () => {
    handleSetId(id);
  };

  return (
    <div className="bookmark">
      <div>
        <a href={data.url}>{data.title}</a>
      </div>
      <div>
        <button onClick={handleClickUpdate}>Edit</button>
        <button onClick={handleClickDelete}>X</button>
      </div>
    </div>
  );
};

export default Bookmark;
