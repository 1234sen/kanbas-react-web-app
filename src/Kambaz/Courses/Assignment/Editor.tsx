import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, setAssignment, updateAssignment } from "./reducer";
import * as client from "./client";
import "./editor.css";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignmentFromState = useSelector((state: any) => state.assignmentsReducer.assignment);
  const isNewAssignment = aid === "new";

  const [assignment, setAssignmentLocal] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
    course: cid
  });

  const fetchAssignment = async () => {
    if (!isNewAssignment && aid) {
      try {
        const data = await client.findAssignmentById(aid);
        setAssignmentLocal(data);
        dispatch(setAssignment(data));
      } catch (error) {
        console.error("Failed to fetch assignment", error);
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
      }
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);

  const handleSave = async () => {
    try {
      if (isNewAssignment) {
        const newAssignment = await client.createAssignment(cid!, assignment);
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await client.updateAssignment(assignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAssignmentLocal({
      ...assignment,
      [name]: value
    });
  };

  return (
    <div className="wd-assignments-editor">
      <div className="wd-assignment-name-section">
        <label>Assignment Name</label>
        <input
          className="wd-assignment-name-input"
          name="title"
          value={assignment.title}
          onChange={handleChange}
        />
      </div>

      <div className="wd-assignment-description">
        <label>Description</label>
        <textarea
          className="wd-description-textarea"
          name="description"
          value={assignment.description}
          onChange={handleChange}
        />
      </div>

      <div className="wd-points-section">
        <label>Points</label>
        <input
          type="number"
          className="wd-points-input"
          name="points"
          value={assignment.points}
          onChange={handleChange}
        />
      </div>

      <div className="wd-assign-section">
        <h3>Assign</h3>
        <div className="wd-assign-group">
          <div className="wd-assign-item">
            <label>Due Date</label>
            <input
              className="wd-text-input"
              name="dueDate"
              value={assignment.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="wd-assign-dates">
            <div className="wd-assign-item">
              <label>Available from</label>
              <div className="wd-date-input-group">
                <input
                  className="wd-text-input"
                  name="availableFromDate"
                  value={assignment.availableFromDate}
                  onChange={handleChange}
                />
                <button className="wd-calendar-button">📅</button>
              </div>
            </div>

            <div className="wd-assign-item">
              <label>Until</label>
              <input
                className="wd-text-input"
                name="availableUntilDate"
                value={assignment.availableUntilDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wd-button-group">
        <button onClick={handleSave} className="wd-button wd-button-save">
          Save
        </button>
        <button onClick={handleCancel} className="wd-button wd-button-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
} 