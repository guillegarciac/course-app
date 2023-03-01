import React, { useState } from 'react';
import './App.css';
import { courses as courseList } from './data';
import Card from './components/Card';

function App() {

  const [courses, setCourses] = useState(courseList);

  // ********** WITH MULTIPLE STATES *****************//
  // const [title, setTitle] = useState('');
  // const [image, setImage] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState(50);
  // const [hasDiscount, setDiscount] = useState(false);
  // const [type, setType] = useState('remote');

  // ********** WITH ONE STATE ***********************//
  const initialState = {
    title: '',
    image: '',
    description: '',
    price: 50,
    hasDiscount: false,
    type: 'remote'
  }
  const [newCourse, setNewCourse] = useState(initialState);

  // ********** FOR THE SEARCH INPUT *****************//
  const [searchValue, setSearchValue] = useState('');

  // ********** TO HIDE AND SHOW FORM ****************//
  const [showForm, setShowForm] = useState(false);

  const handleSortByPrice = () => {
    const sortByPrice = [...courses].sort((a, b) => a.price - b.price);
    setCourses(sortByPrice);
  }

  const handleFilterRemote = () => {
    const filteredCourses = courses.filter(elem => elem.type === 'remote');
    setCourses(filteredCourses);
  }


  // ********** WITH MULTIPLE STATES *****************//
  // const handleTitle = (event) => {
  //   setTitle(event.target.value)
  // }
  // const handleImage = (e) => {
  //   setImage(e.target.value)
  // }
  // const handleDescription = (e) => {
  //   setDescription(e.target.value)
  // }
  // const handlePrice = (e) => {
  //   setPrice(e.target.value)
  // }
  // const handleType = (e) => {
  //   setType(e.target.value)
  // }

  // ********** WITH ONE STATE ***********************//
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
    const courseWithId = { ...newCourse, _id: courses.length + 1 }
    setCourses([...courses, courseWithId]);
    setNewCourse(initialState);
  }

  const handleShowCourse = () => {
    setShowForm(prev => !prev)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue)
  }

  return (
    <div className="app">
      {console.log('rendering')}
      <header>
        <h1>Best tech courses</h1>
      </header>
      <div className="search_container">
        <input type="text" name="search" value={searchValue} onChange={handleSearch} placeholder="What are you looking for?" />
      </div>
      <div className="action_container">
        <button className="btn" onClick={handleSortByPrice}>Sort by price</button>
        <button className="btn" onClick={handleFilterRemote}>Show only remote</button>
        <button className="btn" onClick={handleShowCourse}>{showForm ? 'Hide' : 'Show'}</button>
      </div>
      {showForm && <div className="form_container">
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
            <input type="checkbox" name="hasDiscount" required onChange={handleDiscount} />
          </div>
          <select name="type" value={newCourse.type} onChange={handleChange}>
            <option value="remote">Remote</option>
            <option value="in person">In person</option>
          </select>
          <button type="submit" className="btn">Create</button>
        </form>
      </div>}
      <div className="card_container">
        {courses.filter(elem => elem.title.toLowerCase().includes(searchValue.toLowerCase()) || elem.description.toLowerCase().includes(searchValue.toLowerCase()))
          .map(elem => {
            return <Card key={elem._id} course={elem} />
          })}
      </div>
    </div>
  );
}

export default App;
