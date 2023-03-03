import React from 'react';

export default function Card({ course, handleDelete }) {
  const { image, title, description, price, hasDiscount, type, _id } = course;

  const handleDeleteCourse = () => {
    handleDelete(_id)
  }

  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={image} alt={title} />
      <p>{description}</p>
      <ul>
        <li>Price: {price}$</li>
        <li>{hasDiscount ? 'This course has discount' : 'No discounts available for this course'}</li>
        <li>Type of course: {type}</li>
      </ul>
      <button className="btn">See more</button>
      <button className="btn" style={{ marginLeft: '10px' }} onClick={handleDeleteCourse}>Delete</button>
    </div>
  )
}



