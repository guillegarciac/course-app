import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { courses } from '../data';

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(courseId)

  useEffect(() => {
    // eslint-disable-next-line
    const currentCourse = courses.find(elem => elem._id == courseId);
    if (currentCourse) {
      setLoading(false);
      setCourse(currentCourse);
    } else {
      console.log(currentCourse)
      setLoading(false);
      setError(true)
    }
  }, [courseId])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && course && <Card course={course} />}
      {error && <p>Something went wrong. Couldn't find your course</p>}
    </div>
  )
}
