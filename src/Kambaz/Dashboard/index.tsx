import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as db from "../Database";
import { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } from "../../reducers/enrollmentReducer";

import ReactImage from "../assets/react1.jpg"

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse, enrolling, setEnrolling ,updateEnrollment 

}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: (course: any) => void;
     enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
     updateEnrollment: (courseId: string, enrolled: boolean) => void 
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

    const handleEnrollToggle = (courseId: string) => {
        if (isEnrolled(courseId)) {
            dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
        } else {
            dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
        }
    };
//     console.log('currentUser:', currentUser);
// console.log('isStudent:', isStudent);
    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Dashboard</h1>
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>

                {isStudent && (
                    <Button
                        variant="primary"
                        onClick={() => dispatch(toggleShowAllCourses())}
                    >
                        {showAllCourses ? "Show Enrolled" : "Show All Courses"}
                    </Button>
                )}
            </div>

            {!isStudent && (
                <div className="mb-4">
                    <h5>
                        New Course
                        <Button onClick={addNewCourse} className="float-end">Add</Button>
                        <Button onClick={updateCourse} className="float-end me-2" variant="warning">
                            Update
                        </Button>
                    </h5>
                    {/* Course editing form */}
                </div>
            )}

            <h2>Published Courses ({displayedCourses.length})</h2>
            <Row xs={1} md={3} lg={4} className="g-4">
                {displayedCourses.map((course) => (
                    <Col key={course._id}>
                        <Card>
                            <Card.Img variant="top" src={ReactImage} />
                            <Card.Body>
                                <Card.Title>{course.name}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    {isStudent ? (
                                        <>
                                            {isEnrolled(course._id) ? (
                                                <>
                                                    <Button
                                                        // onClick={() => navigate(`/Kambaz/Courses/${course._id}/Home`)}
                                                        onClick={() => navigate(`/Kambaz/Courses/${course._id}`)}

                                                        variant="primary"
                                                    >
                                                        Go to Course
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleEnrollToggle(course._id)}
                                                        variant="danger"
                                                    >
                                                        Unenroll
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    onClick={() => handleEnrollToggle(course._id)}
                                                    variant="success"
                                                    className="w-100"
                                                >
                                                    Enroll
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                // onClick={() => navigate(`/Kambaz/Courses/${course._id}/Home`)}
                                                onClick={() => navigate(`/Kambaz/Courses/${course._id}`)}
                                                variant="primary"
                                            >
                                                Go to Course
                                            </Button>
                                            <Button
                                                onClick={() => deleteCourse(course._id)}
                                                variant="danger"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => updateCourse(course)}
                                                variant="warning"
                                            >
                                                Edit
                                            </Button>
                                            {enrolling && (
              <button  onClick={(event) => {
                event.preventDefault();
                updateEnrollment(course._id, !course.enrolled);
              }} className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                {course.enrolled ? "Unenroll" : "Enroll"}
              </button>
            )}
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
} 
