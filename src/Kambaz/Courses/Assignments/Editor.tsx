import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addAssignment, updateAssignment, setAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { assignment } = useSelector((state: any) => state.assignmentsReducer);
    const [formData, setFormData] = useState(assignment);

    useEffect(() => {
        if (aid === "new") {
            dispatch(setAssignment({
                title: "New Assignment",
                description: "",
                points: 100,
                dueDate: "",
                availableFromDate: "",
                availableUntilDate: "",
                course: cid
            }));
        } else {
            const { assignments } = useSelector((state: any) => state.assignmentsReducer);
            const currentAssignment = assignments.find((a: any) => a._id === aid);
            if (currentAssignment) {
                dispatch(setAssignment(currentAssignment));
            }
        }
    }, [aid, cid]);

    const handleSubmit = () => {
        if (aid === "new") {
            dispatch(addAssignment(formData));
        } else {
            dispatch(updateAssignment(formData));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div className="wd-assignments-editor">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({
                            ...formData,
                            title: e.target.value
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({
                            ...formData,
                            description: e.target.value
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                        type="number"
                        value={formData.points}
                        onChange={(e) => setFormData({
                            ...formData,
                            points: parseInt(e.target.value)
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({
                            ...formData,
                            dueDate: e.target.value
                        })}
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
} 