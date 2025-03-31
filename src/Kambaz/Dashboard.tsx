import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
// import * as db from "./Database";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { showAllCourses, enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const isStudent = currentUser?.role === "STUDENT";
  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);

  const displayedCourses = isStudent && !showAllCourses
    ? courses.filter(course => isEnrolled(course._id))
    : courses;

  // const handleEnrollToggle = (courseId: string) => {
  //   if (isEnrolled(courseId)) {
  //     dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
  //   } else {
  //     dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
  //   }
  // };
  console.log('isStudent', isStudent)


  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>

      </div>


      <h2>Published Courses ({displayedCourses.length})</h2>
      <Row xs={1} md={3} lg={4} className="g-4">
        {courses.map((course) => (
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to={`/Kambaz/Courses/${course._id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark" >
                <Card.Img src="../../src/assets/react.jpg" variant="top" width="100%" height={160} />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
} 

function unenrollFromCourse(arg0: { userId: any; courseId: string; }): any {
  throw new Error("Function not implemented.");
}
function enrollInCourse(arg0: { userId: any; courseId: string; }): any {
  throw new Error("Function not implemented.");
}

