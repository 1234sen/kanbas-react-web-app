import { useState } from "react";

export default function AssignmentEditor() {
  const [assignmentName, setAssignmentName] = useState("A1 - ENV + HTML");
  const [description, setDescription] = useState(
    "The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following:\n\n1. Your full name and section\n2. Links to each of the lab assignments\n3. Link to the Kanbaz application\n4. Links to all relevant source code repositories\n\nThe Kanbaz application should include a link to navigate back to the landing page."
  );
  const [points, setPoints] = useState(100);
  const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
  const [gradeType, setGradeType] = useState("Percentage");
  const [submissionType, setSubmissionType] = useState("Online");
  const [dueDate, setDueDate] = useState("2024-05-13");
  const [availableFrom, setAvailableFrom] = useState("2024-05-06");
  const [availableUntil, setAvailableUntil] = useState("2024-05-20");

  return (
    <div id="wd-assignments-editor">
      <h2>Assignment Name</h2>
      <input
        id="wd-name"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
      />
      <br />
      <br />
      <textarea
        id="wd-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input
                id="wd-points"
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select
                id="wd-assignment-group"
                value={assignmentGroup}
                onChange={(e) => setAssignmentGroup(e.target.value)}
              >
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>PROJECTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade-type">Display Grade as</label>
            </td>
            <td>
              <select
                id="wd-grade-type"
                value={gradeType}
                onChange={(e) => setGradeType(e.target.value)}
              >
                <option>Percentage</option>
                <option>Complete/Incomplete</option>
                <option>Letter Grade</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select
                id="wd-submission-type"
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
              >
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">Online Entry Options</td>
            <td>
              <label>
                <input type="checkbox" /> Text Entry
              </label>
              <br />
              <label>
                <input type="checkbox" /> Website URL
              </label>
              <br />
              <label>
                <input type="checkbox" /> Media Recordings
              </label>
              <br />
              <label>
                <input type="checkbox" /> Student Annotation
              </label>
              <br />
              <label>
                <input type="checkbox" /> File Uploads
              </label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">Assign to</td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">Due</td>
            <td>
              <input
                id="wd-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">Available from</td>
            <td>
              <input
                id="wd-available-from"
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">Until</td>
            <td>
              <input
                id="wd-available-until"
                type="date"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button>Cancel</button> <button>Save</button>
    </div>
  );
}
