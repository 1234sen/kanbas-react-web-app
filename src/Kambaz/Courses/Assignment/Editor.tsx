import { useState } from "react";
import "./editor.css";

export default function AssignmentEditor() {
  const [assignmentName, setAssignmentName] = useState("A1 - ENV + HTML");
  const [description, setDescription] = useState(
    "The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page."
  );
  const [points, setPoints] = useState(100);
  const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
  const [gradeType, setGradeType] = useState("Percentage");
  const [submissionType, setSubmissionType] = useState("Online");
  const [assignTo, setAssignTo] = useState("Everyone");
  const [dueDate, setDueDate] = useState("2024-05-13");
  const [availableFrom, setAvailableFrom] = useState("2024-05-06");
  const [availableUntil, setAvailableUntil] = useState("2024-05-20");

  return (
    <div className="wd-assignments-editor">
      <div className="wd-assignment-name-section">
        <label>Assignment Name</label>
        <input
          className="wd-assignment-name-input"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
        />
      </div>

      <div className="wd-assignment-description">
        <div className="wd-description-text">
          <p>
            The assignment is <span className="available-online">available online</span>
          </p>
          <p>
            Submit a link to the landing page of your web application running on
            Netlify.
          </p>
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>
            The Kanbas application should include a link to navigate back to the
            landing page.
          </p>
        </div>
      </div>

      <div className="wd-points-section">
        <label>Points</label>
        <input
          type="number"
          className="wd-points-input"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </div>

      <div className="wd-assign-section">
        <h3>Assign</h3>
        <div className="wd-assign-group">
          <div className="wd-assign-item">
            <label>Assign to</label>
            <input
              className="wd-text-input"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
            />
          </div>

          <div className="wd-assign-item">
            <label>Due</label>
            <input
              type="date"
              className="wd-text-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="wd-assign-dates">
            <div className="wd-assign-item wd-date-item">
              <label>Available from</label>
              <input
                type="date"
                className="wd-text-input"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </div>

            <div className="wd-assign-item wd-date-item">
              <label>Until</label>
              <input
                type="date"
                className="wd-text-input"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wd-button-group">
        <button className="wd-button wd-button-cancel">Cancel</button>
        <button className="wd-button wd-button-save">Save</button>
      </div>
    </div>
  );
}
