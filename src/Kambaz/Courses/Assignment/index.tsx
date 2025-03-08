import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

interface Assignment {
  _id: string;
  name: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
}

export default function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  useEffect(() => {
    // 从本地存储加载作业
    const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    setAssignments(storedAssignments);
  }, []);

  const handleDelete = (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment) {
      const updatedAssignments = assignments.filter(a => a._id !== selectedAssignment);
      setAssignments(updatedAssignments);
      localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
      setShowDeleteDialog(false);
      setSelectedAssignment(null);
    }
  };

  return (
    <div className="wd-assignments">
      <div className="wd-assignments-header">
        <input
          placeholder="Search for Assignments"
          className="wd-search-assignment"
        />
        <button className="wd-add-assignment-group">
          + Group
        </button>
        <button
          className="wd-add-assignment"
          onClick={() => navigate("new")}
        >
          + Assignment
        </button>
      </div>

      <h3 className="wd-assignments-title">
        <div>ASSIGNMENTS</div>
        <div className="wd-assignments-title-bottom">
          <span className="percentage">40% of Total</span>
          <button className="wd-more-button">+</button>
          <button className="wd-more-button">⋮</button>
        </div>
      </h3>

      <ul className="wd-assignment-list">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="wd-assignment-list-item">
            <div className="wd-assignment-icon">
              <svg className="icon" viewBox="0 0 1024 1024" width="15" height="15">
                <path d="M170.666667 345.6l243.2-243.2 59.733333 59.733333L256 384v349.866667h512v-298.666667h-256v-85.333333h341.333333v469.333333H170.666667V345.6z m298.666666 128h85.333334v85.333333h-85.333334v-85.333333z"
                  fill="#1afa29" />
              </svg>
            </div>
            <div className="wd-assignment-content">
              <Link
                to={`${assignment._id}`}
                className="wd-assignment-link"
              >
                {assignment.name}
              </Link>
              <p className="wd-assignment-info">
                <span className="wd-not-available">Multiple Modules</span>
                <span> | Not available until {assignment.availableFromDate} | </span>
                <br />
                Due {assignment.dueDate} | {assignment.points} pts
              </p>
            </div>
            <div className="wd-assignment-actions">
              <span className="wd-check-icon">✓</span>
              <button
                className="wd-delete-button"
                onClick={() => handleDelete(assignment._id)}
              >
                🗑️
              </button>
              <button className="wd-more-button">⋮</button>
            </div>
          </li>
        ))}
      </ul>

      {showDeleteDialog && (
        <div className="wd-delete-dialog">
          <div className="wd-delete-dialog-content">
            <h4>Delete Assignment</h4>
            <p>Are you sure you want to delete this assignment?</p>
            <div className="wd-delete-dialog-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowDeleteDialog(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}