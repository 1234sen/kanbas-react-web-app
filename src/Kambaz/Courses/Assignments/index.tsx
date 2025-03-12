import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { setAssignments, deleteAssignment } from "./reducer";
import * as db from "../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const courseAssignments = db.assignments.filter(
            (assignment: any) => assignment.course === cid
        );
        dispatch(setAssignments(courseAssignments));
    }, [cid]);

    const handleDeleteAssignment = (assignmentId: string) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            dispatch(deleteAssignment(assignmentId));
        }
    };

    return (
        <div className="wd-assignments">
            <div className="d-flex justify-content-end mb-3">
                <Link
                    to={`/Kambaz/Courses/${cid}/Assignments/new`}
                    className="btn btn-success"
                >
                    + Assignment
                </Link>
            </div>

            <ul className="wd-assignment-list list-group">
                {assignments.map((assignment: any) => (
                    <li
                        key={assignment._id}
                        className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                <svg viewBox="0 0 1024 1024" width="15" height="15">
                                    <path d="M170.666667 345.6l243.2-243.2 59.733333 59.733333L256 384v349.866667h512v-298.666667h-256v-85.333333h341.333333v469.333333H170.666667V345.6z"
                                        fill="#1afa29" />
                                </svg>
                            </div>
                            <div>
                                <Link
                                    to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                                    className="wd-assignment-link"
                                >
                                    {assignment.title}
                                </Link>
                                <p className="wd-assignment-info mb-0">
                                    Due {assignment.dueDate} | {assignment.points} pts
                                </p>
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteAssignment(assignment._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
} 