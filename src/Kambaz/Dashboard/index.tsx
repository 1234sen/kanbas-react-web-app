import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { setCourses } from "../Courses/reducer";
import * as db from "../Database";

export default function Dashboard() {
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // 如果是学生,只显示已注册的课程
        if (currentUser?.role === "STUDENT") {
            const enrolledCourses = db.courses.filter(course =>
                db.enrollments.some(
                    enrollment =>
                        enrollment.user === currentUser._id &&
                        enrollment.course === course._id
                )
            );
            dispatch(setCourses(enrolledCourses));
        } else {
            dispatch(setCourses(db.courses));
        }
    }, [currentUser]);

    return (
        <div id="wd-dashboard">
            <h1>Dashboard</h1>
            <h2>Published Courses ({courses.length})</h2>
            <Row xs={1} md={3} lg={4} className="g-4">
                {courses.map((course: any) => (
                    <Col key={course._id}>
                        <Card>
                            <Card.Img variant="top" src="/images/reactjs.jpg" />
                            <Card.Body>
                                <Card.Title>{course.name}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="btn btn-primary">
                                    Go to Course
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
} 