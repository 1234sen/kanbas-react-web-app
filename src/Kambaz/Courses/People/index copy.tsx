import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Dropdown, Spinner, Alert, Card } from "react-bootstrap";
import * as client from "./client";
import { setPeople, addPerson, updatePerson, removePerson, setLoading, setError } from "./reducer";
import { MdPeople, MdPersonAdd } from "react-icons/md";
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";
import "./index.css";

export default function People() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { people, loading, error } = useSelector((state: any) => state.peopleReducer);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "STUDENT"
    });

    const isFaculty = currentUser && currentUser.role === "FACULTY";

    // Fetch all people in the course
    const fetchPeople = async () => {
        if (!cid) return;

        try {
            dispatch(setLoading());
            const data = await client.findPeopleInCourse(cid);
            dispatch(setPeople(data));
        } catch (err: any) {
            dispatch(setError(err.message));
        }
    };

    // Add new user
    const handleAddUser = async () => {
        if (!cid) return;

        try {
            const result = await client.createUserAndAddToCourse(cid, newUser, newUser.role);
            dispatch(addPerson({
                ...newUser,
                _id: result.user,
                enrollmentId: result._id,
                enrollmentDate: result.enrollmentDate,
                role: result.role
            }));
            setShowAddModal(false);
            setNewUser({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                role: "STUDENT"
            });
        } catch (err: any) {
            console.error("Failed to add user:", err);
        }
    };

    // Update user role
    const handleUpdateRole = async (enrollmentId: string, newRole: string) => {
        try {
            const result = await client.updateUserRoleInCourse(enrollmentId, newRole);
            dispatch(updatePerson({ enrollmentId, role: newRole }));
        } catch (err: any) {
            console.error("Failed to update role:", err);
        }
    };

    // Remove user from course
    const handleRemoveUser = async (enrollmentId: string) => {
        try {
            await client.removeUserFromCourse(enrollmentId);
            dispatch(removePerson(enrollmentId));
        } catch (err: any) {
            console.error("Failed to remove user:", err);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, [cid]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-3">
                Failed to load people: {error}
            </Alert>
        );
    }

    // Count users by role
    const studentCount = people.filter(p => p.role === "STUDENT").length;
    const facultyCount = people.filter(p => p.role === "FACULTY").length;
    const taCount = people.filter(p => p.role === "TEACHING_ASSISTANT").length;

    // People Status component for the right sidebar
    const PeopleStatus = () => (
        <div id="wd-people-status" style={{ width: "350px" }}>
            <Card>
                <Card.Header>
                    <h4 className="mb-0">Course Enrollment Stats</h4>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                        <FaUserGraduate className="me-2 fs-3 text-primary" />
                        <div>
                            <h5 className="mb-0">Students</h5>
                            <div className="fs-4">{studentCount}</div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <FaChalkboardTeacher className="me-2 fs-3 text-success" />
                        <div>
                            <h5 className="mb-0">Faculty</h5>
                            <div className="fs-4">{facultyCount}</div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <FaUserTie className="me-2 fs-3 text-info" />
                        <div>
                            <h5 className="mb-0">Teaching Assistants</h5>
                            <div className="fs-4">{taCount}</div>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="d-grid gap-2">
                        {isFaculty && (
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>
                                <MdPersonAdd className="me-2" /> Add New Person
                            </Button>
                        )}
                        <Button variant="outline-secondary">
                            <MdPeople className="me-2" /> View Enrollment History
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );

    return (
        <div className="d-flex" id="wd-people">
            {/* Main content - People list (left side) */}
            <div className="flex-fill me-3">
                <div className="people-container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Course Personnel</h2>
                        <div className="d-xl-none">
                            {isFaculty && (
                                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                                    <MdPersonAdd className="me-2" /> Add Person
                                </Button>
                            )}
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Enrollment Date</th>
                                {isFaculty && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {people.map((person: any) => (
                                <tr key={person.enrollmentId}>
                                    <td>{`${person.firstName} ${person.lastName}`}</td>
                                    <td>{person.username}</td>
                                    <td>
                                        {isFaculty && person._id !== currentUser._id ? (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline-secondary" id={`role-dropdown-${person.enrollmentId}`}>
                                                    {person.role}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleUpdateRole(person.enrollmentId, "STUDENT")}>
                                                        STUDENT
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleUpdateRole(person.enrollmentId, "FACULTY")}>
                                                        FACULTY
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleUpdateRole(person.enrollmentId, "TEACHING_ASSISTANT")}>
                                                        TEACHING_ASSISTANT
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : (
                                            person.role
                                        )}
                                    </td>
                                    <td>{new Date(person.enrollmentDate).toLocaleDateString()}</td>
                                    {isFaculty && (
                                        <td>
                                            {person._id !== currentUser._id && (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleRemoveUser(person.enrollmentId)}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Right sidebar - visible only on XL screens */}
            <div className="d-none d-xl-block">
                <PeopleStatus />
            </div>

            {/* Add User Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User to Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={newUser.username}
                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="TEACHING_ASSISTANT">Teaching Assistant</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}