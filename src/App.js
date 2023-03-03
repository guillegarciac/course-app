import React, { useState } from 'react';
import './App.css';
import { courses as courseList } from './data';
import Card from './components/Card';
import AddCourseForm from './components/AddCourseForm';
import SearchInput from './components/SearchInput';

function App() {

  const [courses, setCourses] = useState(courseList);
  const [searchValue, setSearchValue] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSortByPrice = () => {
    const sortByPrice = [...courses].sort((a, b) => a.price - b.price);
    setCourses(sortByPrice);
  }

  const handleFilterRemote = () => {
    const filteredCourses = courses.filter(elem => elem.type === 'remote');
    setCourses(filteredCourses);
  }

  const handleAddCourse = (newCourseData) => {
    const courseWithId = { ...newCourseData, _id: courses.length + 1 }
    setCourses([...courses, courseWithId]);
  }

  const handleShowCourse = () => {
    setShowForm(prev => !prev)
  }

  const handleSearch = (value) => {
    console.log('Dad ', value)
    setSearchValue(value);
  }

  const handleDelete = (courseId) => {
    const cleanCourses = [...courses].filter(elem => elem._id !== courseId)
    setCourses(cleanCourses);
  }


  return (
    <div className="app">
      <header>
        <h1>Best tech courses</h1>
      </header>
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
    </div>
  );
}

export default App;