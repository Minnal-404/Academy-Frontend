import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import User from './pages/User.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Student from './pages/students/Student.jsx';
import Company from './pages/company/Company.jsx';
import Academy from './pages/academy/Academy.jsx';
import AddProject from './pages/students/AddProject.jsx';
import AcademyLayout from './components/layout/AcademyLayout.jsx';
import AllLanguages from './pages/academy/AllLanguages.jsx';
import AllStudents from './pages/academy/AllStudents.jsx';
import AllProfiles from './pages/academy/AllProfiles.jsx';
import TechUpdates from './pages/academy/TechUpdates.jsx';
import EnglishUpdates from './pages/academy/EnglishUpdates.jsx';
import AllUpdatesLayout from './components/layout/AllUpdatesLayout.jsx';
import ProjectUpdates from './pages/academy/ProjectUpdates.jsx';
import CompanyLayout from './components/layout/CompanyLayout.jsx';





function App() {
  return (
    <div className=' d-flex flex-column justify-content-between vh-100 bg-black '>
      <Header />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/home/student" element={<Student />} />
        <Route path="/home/student/add_project" element={<AddProject />} />
        <Route path="/home/academy" element={<AcademyLayout />}>
          <Route index element={<AllLanguages />} />
          <Route path="all_students" element={<AllStudents />} />
          <Route path="all_profiles" element={<AllProfiles />} />
          <Route path="all_updates" element={<AllUpdatesLayout/>}>

            <Route index element={<TechUpdates />} />
            <Route path="english" element={<EnglishUpdates />} />
            <Route path="project" element={<ProjectUpdates />} />
          </Route>
        </Route>
        <Route path="/home/company" element={<Company />} >
          {/* <Route index element={<Company />} />
            <Route path="filter/rank" element={<Rank />} />
            <Route path="filter/tech" element={<Tech />} />
         */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
