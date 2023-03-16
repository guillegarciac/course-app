import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import AddCourseForm from '../components/AddCourseForm';
import SearchInput from '../components/SearchInput';
import courseService from '../services/courseService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      //const response = await axios.get('http://localhost:8080/courses')
      const response = await courseService.getCourses();
      setCourses(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  const handleSortByPrice = () => {
    const sortByPrice = [...courses].sort((a, b) => a.price - b.price);
    setCourses(sortByPrice);
  }

  const handleFilterRemote = () => {
    const filteredCourses = courses.filter(elem => elem.type === 'remote');
    setCourses(filteredCourses);
  }

  const handleAddCourse = async (newCourseData) => {
    try {
      const newCourse = await courseService.createCourse(newCourseData);
      //const newCourse = await axios.post('http://localhost:8080/courses', newCourseData);
      navigate(`/courses/${newCourse._id}`)
    } catch (error) {
      console.error(error)
    }
    // Before integration with backend
    // const courseWithId = { ...newCourseData, _id: courses.length + 1 }
    // setCourses([...courses, courseWithId]);
  }

  const handleShowCourse = () => {
    setShowForm(prev => !prev)
  }

  const handleSearch = (value) => {
    console.log('Dad ', value)
    setSearchValue(value);
  }

  const handleDelete = async (courseId) => {
    try {
      //const deletedCourse = await axios.delete(`http://localhost:8080/courses/${courseId}`);
      const deletedCourse = await courseService.deleteCourse(courseId);
      console.log(deletedCourse);
    } catch (error) {
      console.error(error)
    } finally {
      getCourses()
    }
    // const cleanCourses = [...courses].filter(elem => elem._id !== courseId)
    // setCourses(cleanCourses);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading &&
        (<div className="app">
          <div className="search_container">
            <SearchInput handleSearchValue={handleSearch} />
          </div>
          <div className="action_container">
            <button className="btn" onClick={handleSortByPrice}>Sort by price</button>
            <button className="btn" onClick={handleFilterRemote}>Show only remote</button>
            <button className="btn" onClick={handleShowCourse}>{showForm ? 'Hide' : 'Show'}</button>
          </div>
          {showForm && <AddCourseForm handleAddCourse={handleAddCourse} />}
          <div className="card_container">
            {courses.filter(elem => elem.title.toLowerCase().includes(searchValue.toLowerCase()) || elem.description.toLowerCase().includes(searchValue.toLowerCase()))
              .map(elem => {
                return <Card key={elem._id} course={elem} handleDelete={handleDelete} />
              })}
          </div>
        </div>)}
    </>
  );
}
