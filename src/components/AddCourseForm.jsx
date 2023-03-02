import React, { useState } from 'react'

export default function AddCourseForm({ handleAddCourse }) {
  const initialState = {
    title: '',
    image: '',
    description: '',
    price: 50,
    hasDiscount: false,
    type: 'remote'
  }
  const [newCourse, setNewCourse] = useState(initialState);

  const handleChange = (e) => {
    setNewCourse(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleDiscount = (e) => {
    setNewCourse(prev => {
      return {
        ...prev,
        hasDiscount: e.target.checked
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCourse(newCourse);
    setNewCourse(initialState);
  }

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <label>Course title</label>
        <input type="text" name="title" value={newCourse.title} onChange={handleChange} required />
        <label>Course image</label>
        <input type="text" name="image" required value={newCourse.image} onChange={handleChange} />
        <label>Course description</label>
        <input type="text" name="description" required value={newCourse.description} onChange={handleChange} />
        <label>Course price</label>
        <input type="number" name="price" required value={newCourse.price} onChange={handleChange} />
        <div className="checkbox_container">
          <label>Does this course have discount?</label>
          <input type="checkbox" name="hasDiscount" onChange={handleDiscount} />
        </div>
        <select name="type" value={newCourse.type} onChange={handleChange}>
          <option value="remote">Remote</option>
          <option value="in person">In person</option>
        </select>
        <button type="submit" className="btn">Create</button>
      </form>
    </div>
  )
}
