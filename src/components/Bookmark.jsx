import React from 'react'

const Bookmark = ({data}) => {
    console.log(data)
  return (
    <div>
      {data.title}
    </div>
  )
}

export default Bookmark
