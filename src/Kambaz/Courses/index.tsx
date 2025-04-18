import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
// import { courses } from "../Database";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home/index";
import Assignments from "./Assignment/index";
import AssignmentEditor from "./Assignment/Editor.tsx";
import PeopleTable from './People/Table.tsx'
import Quizzes from "./Quizzes/index";
import QuizDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor";
import QuizPreview from "./Quizzes/Preview";
import TakeQuiz from "./Quizzes/TakeQuiz";
import QuizResults from "./Quizzes/Results";
import { FaAlignJustify } from 'react-icons/fa';

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {/* {course && course.name} &gt; {pathname.split("/")[4]} */}

      </h2>

      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <CourseNavigation course={undefined} />
            </td>
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                {/* <Route path="People" element={<h2>People</h2>} /> */}
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<PeopleTable />} />

                <Route path="Quizzes" element={<Quizzes />} />
                <Route path="Quizzes/:qid" element={<QuizDetails />} />
                <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
                <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
                <Route path="Quizzes/:qid/take/:attemptId" element={<TakeQuiz />} />
                <Route path="Quizzes/:qid/results/:attemptId" element={<QuizResults />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
