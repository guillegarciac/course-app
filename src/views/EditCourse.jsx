import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import courseService from '../services/courseService';
import axios from 'axios';

export default function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const getCourse = async () => {
    try {
      const response = await courseService.getCourse(courseId);
      setCourse(response);
      setError(false);
      console.log(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line
  }, [courseId])


  const handleChange = (e) => {
    setCourse(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleDiscount = (e) => {
    setCourse(prev => {
      return {
        ...prev,
        hasDiscount: e.target.checked
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseService.editCourse(courseId, course);
      //await axios.put(`http://localhost:8080/courses/${courseId}`, course)
      navigate(`/courses/${courseId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your course</p>}
        <label>Course title</label>
        <input type="text" name="title" value={course.title} onChange={handleChange} required />
        <label>Course image</label>
        <input type="text" name="image" required value={course.image} onChange={handleChange} />
        <label>Course description</label>
        <input type="text" name="description" required value={course.description} onChange={handleChange} />
        <label>Course price</label>
        <input type="number" name="price" required value={course.price} onChange={handleChange} />
        <div className="checkbox_container">
          <label>Does this course have discount?</label>
          <input type="checkbox" name="hasDiscount" checked={course.hasDiscount} onChange={handleDiscount} />
        </div>
        <select name="type" value={course.type} onChange={handleChange}>
          <option value="remote">Remote</option>
          <option value="in person">In person</option>
        </select>
        <button type="submit" className="btn">Save changes</button>
      </form>
    </div>
  )
}
