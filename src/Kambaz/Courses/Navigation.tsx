// import { AiOutlineDashboard } from "react-icons/ai";
// import { IoCalendarOutline } from "react-icons/io5";
// import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
// import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CoursesNavigation({ course }: { course: any }) {
  const { cid } = useParams();
  const { pathname } = useLocation();

  // 导航链接数组
  const links = [
    { label: "Home", path: `/Kambaz/Courses/${cid}` },
    { label: "Modules", path: `/Kambaz/Courses/${cid}/Modules` },
    { label: "Assignments", path: `/Kambaz/Courses/${cid}/Assignments` },
    { label: "People", path: `/Kambaz/Courses/${cid}/People` }, // 添加People导航
  ];

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser && currentUser.role === "FACULTY";

  return (
    <div className="list-group wd-course-navigation">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item ${pathname.includes(link.label) ? "active" : ""}`}
        >
          {link.label}
        </Link>
      ))}

      {isFaculty && (
        <Link
          to={`/Kambaz/Courses/${cid}/Enrollment`}
          className={`list-group-item ${pathname.includes("Enrollment") ? "active" : ""}`}
        >
          Registration
        </Link>
      )}
    </div>
  );
}