import { useState } from "react";
import "./editor.css";

export default function AssignmentEditor() {
  const [assignmentName, setAssignmentName] = useState("A1");
  const [description, setDescription] = useState(
    "The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page."
  );
  const [points, setPoints] = useState(100);
  const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
  const [gradeType, setGradeType] = useState("Percentage");
  const [submissionType, setSubmissionType] = useState("Online");
  const [assignTo, setAssignTo] = useState("Everyone");
  const [dueDate, setDueDate] = useState("May 13, 2024, 11:59 PM");
  const [availableFrom, setAvailableFrom] = useState("May 6, 2024, 12:00 AM");
  const [availableUntil, setAvailableUntil] = useState("");

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
            Submit a link to the landing page of your Web application running on
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
              className="wd-text-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="wd-assign-dates">
            <div className="wd-assign-item">
              <label>Available from</label>
              <div className="wd-date-input-group">
                <input
                  className="wd-text-input"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
                <button className="wd-calendar-button">📅</button>
              </div>
            </div>

            <div className="wd-assign-item">
              <label>Until</label>
              <input
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
      </div>
    </div>
  );
}
