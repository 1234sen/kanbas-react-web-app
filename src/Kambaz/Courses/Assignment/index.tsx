import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import * as client from "./client";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Assignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState("");
  const { cid } = useParams();

  const fetchAssignments = async () => {
    try {
      if (cid) {
        const results = await client.findAssignmentsForCourse(cid);
        setAssignments(results);
      }
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await client.deleteAssignment(assignmentToDelete);
      setShowDeleteModal(false);
      fetchAssignments();
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Assignments</h3>
        {cid && (
          <Link to={`/Kambaz/Courses/${cid}/Assignments/new`} className="btn btn-danger">
            <FaPlus className="me-2" />
            Assignment
          </Link>
        )}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>
                <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                  {assignment.title}
                </Link>
              </td>
              <td>{assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "None"}</td>
              <td>{assignment.points || 100}</td>
              <td>
                <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="btn btn-sm btn-primary me-2">
                  <FaEdit />
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(assignment._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}