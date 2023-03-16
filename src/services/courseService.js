import axios from "axios"

class CourseService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/courses`
    });
  }

  getCourses() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getCourse(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  createCourse(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editCourse(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteCourse(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  // async getCourses2() {
  //   try {
  //     const response = await this.api.get('/');
  //     return response.data
  //   } catch (error) {
  //     console.error(err)
  //   }
  // }


}

const courseService = new CourseService();
export default courseService;

