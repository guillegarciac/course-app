import React, { useState } from 'react';
import './App.css';
import { courses as courseList } from './data';
import Card from './components/Card';

function App() {

  const [courses, setCourses] = useState(courseList);

  const handleSortByPrice = () => {
    const sortByPrice = [...courses].sort((a, b) => a.price - b.price);
    setCourses(sortByPrice);
  }

  const handleFilterRemote = () => {
    const filteredCourses = courseList.filter(elem => elem.type === 'remote');
    setCourses(filteredCourses);
  }

  return (
    <div className="app">
      {console.log('Rendering')}
      <header>
        <h1>Best tech courses</h1>
      </header>
      <div className="action_container">
        <button className="btn" onClick={handleSortByPrice}>Sort by price</button>
        <button className="btn" onClick={handleFilterRemote}>Show only remote</button>
      </div>
      <div className="card_container">
        {courses.map(elem => {
          return <Card key={elem._id} course={elem} />
        })}
      </div>
    </div>
  );
}

export default App;
