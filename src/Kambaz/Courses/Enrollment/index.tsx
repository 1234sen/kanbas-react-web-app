import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Spinner, Alert } from "react-bootstrap";
import * as client from "../../Enrollments/client";
import { setEnrollments, addEnrollment, removeEnrollment, setLoading, setError } from "../../../reducers/enrollmentReducer";
import "./index.css";

export default function Enrollment() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments, loading, error } = useSelector((state: any) => state.enrollmentReducer);
    const [isEnrolled, setIsEnrolled] = useState(false);

    const fetchEnrollments = async () => {
        if (!cid) return;

        try {
            dispatch(setLoading());
            const data = await client.findEnrollmentsForCourse(cid);
            dispatch(setEnrollments(data));

            if (currentUser) {
                const enrolled = data.some((e: any) => e.user === currentUser._id);
                setIsEnrolled(enrolled);
            }
        } catch (err: any) {
            dispatch(setError(err.message));
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, [cid, currentUser]);

    const handleEnroll = async () => {
        if (!currentUser || !cid) return;

        try {
            const enrollment = await client.enrollUserInCourse(currentUser._id, cid);
            dispatch(addEnrollment(enrollment));
            setIsEnrolled(true);

            fetchEnrollments();
        } catch (err: any) {
            dispatch(setError(err.message));
        }
    };

    const handleUnenroll = async () => {
        if (!currentUser || !cid) return;

        try {
            await client.unenrollUserInCourse(currentUser._id, cid);
            dispatch(removeEnrollment({ userId: currentUser._id, courseId: cid }));
            setIsEnrolled(false);

            fetchEnrollments();
        } catch (err: any) {
            dispatch(setError(err.message));
        }
    };

    return (
        <div className="enrollment-container">
            <h2>Course Enrollment</h2>

            {loading && (
                <div className="loading-spinner">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger">
                    Error: {error}
                </Alert>
            )}

            {currentUser && (
                <div className="enrollment-actions mb-4">
                    {isEnrolled ? (
                        <Button variant="danger" onClick={handleUnenroll}>
                            Unenroll
                        </Button>
                    ) : (
                        <Button variant="success" onClick={handleEnroll}>
                            Enroll in Course
                        </Button>
                    )}
                </div>
            )}

            <h3>Enrolled Students ({enrollments.length})</h3>
            <Table striped bordered hover className="enrollment-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Enrollment Date</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment: any) => (
                        <tr key={enrollment._id}>
                            <td>{enrollment.user}</td>
                            <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                            <td>{enrollment.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}