import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Modules from "./Courses/Modules";
import Home from "./Courses/Home";
import AssignmentEditor from "./Courses/Assignment/Editor";
import Assignments from "./Courses/Assignment";
import { Link } from "react-router-dom";
import "./Kambaz.css";

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
<h1 className="kambaz-header">
        <Link to="/">Kambaz</Link>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Navigation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td valign="top">
              <KambazNavigation />
            </td>
            <td valign="top">
              <Routes>
                {/* 第一组路由 */}
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="/Courses/Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                
                {/* 第二组路由 */}
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Courses/:cid/*" element={<Courses />} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
