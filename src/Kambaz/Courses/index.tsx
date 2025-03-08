import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
// import { courses } from "../Database";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home/index";
import Assignments from "./Assignment/index";
import AssignmentEditor from "./Assignment/Editor.tsx";
import PeopleTable from './People/Table.tsx'
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
              <CourseNavigation />
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
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
