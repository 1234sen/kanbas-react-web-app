import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { cid } = useParams();

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" />;
  }

  if (currentUser.role === "STUDENT" && cid) {
    const isEnrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );
    if (!isEnrolled) {
      return <Navigate to="/Kambaz/Dashboard" />;
    }
  }

  return children;
}