import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { courses } from '../data';
import courseService from '../services/courseService';

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(courseId)

  const getCourse = async () => {
    try {
      const response = await courseService.getCourse(courseId);
      setLoading(false);
      setCourse(response);
      setError(false);
      console.log(response);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line
  }, [courseId])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && course && <Card course={course} />}
      {error && <p>Something went wrong. Couldn't find your course</p>}
    </div>
  )
}
