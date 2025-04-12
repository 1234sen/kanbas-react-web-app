import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import * as client from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    published: false
  });

  const fetchAssignment = async () => {
    if (aid && aid !== "new") {
      try {
        const data = await client.findAssignmentById(aid);
        // Format dates for HTML date inputs
        if (data.dueDate) data.dueDate = data.dueDate.split("T")[0];
        if (data.availableFrom) data.availableFrom = data.availableFrom.split("T")[0];
        if (data.availableUntil) data.availableUntil = data.availableUntil.split("T")[0];
        setAssignment(data);
      } catch (error) {
        console.error("Failed to fetch assignment details:", error);
      }
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);

  const handleSave = async () => {
    try {
      if (aid === "new") {
        if (cid) {
          await client.createAssignment(cid, assignment);
        }
      } else {
        await client.updateAssignment(assignment);
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setAssignment({
      ...assignment,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <Card>
      <Card.Header>
        <h3>{aid === "new" ? "Create New Assignment" : "Edit Assignment"}</h3>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={assignment.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={assignment.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              name="points"
              value={assignment.points}
              onChange={handleChange}
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={assignment.dueDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              name="availableFrom"
              value={assignment.availableFrom}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available Until</Form.Label>
            <Form.Control
              type="date"
              name="availableUntil"
              value={assignment.availableUntil}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Published"
              name="published"
              checked={assignment.published}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}