import { Navigate, Route, Routes } from "react-router";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home/index";
import Assignments from "./Assignment/index";
import AssignmentEditor from "./Assignment/Editor.tsx";

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2>CS4550</h2>
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
                <Route path="People" element={<h2>People</h2>} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />

              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
