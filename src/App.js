import './App.css';
import {
  Route, Routes
} from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Company from './components/Company';
import Teachers from './components/Teachers';
import CourseDetail from './views/CourseDetail';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/about/company" element={<Company />} />
        <Route path="/about/teachers" element={<Teachers />} /> */}
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="about" element={<About />}>
          <Route path="company" element={<Company />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App;