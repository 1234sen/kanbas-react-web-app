import { Link } from "react-router-dom";
import "./index.css";

export default function Assignments() {
  return (
    <div className="wd-assignments">
      <input
        placeholder="Search for Assignments"
        className="wd-search-assignment"
      />
      <button className="wd-add-assignment-group">
        + Group
      </button>
      <button className="wd-add-assignment">
        + Assignment
      </button>
      <h3 className="wd-assignments-title">

        <div>
          ASSIGNMENTS
        </div>
        <div className="wd-assignments-title-buttom">
          <span className="percentage">40% of Total</span>
          <button className="wd-more-button">+</button>
          <button className="wd-more-button">⋮</button>
        </div>

      </h3>
      <ul className="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <div>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4572" width="15" height="15"><path d="M170.666667 345.6l243.2-243.2 59.733333 59.733333L256 384v349.866667h512v-298.666667h-256v-85.333333h341.333333v469.333333H170.666667V345.6z m298.666666 128h85.333334v85.333333h-85.333334v-85.333333z" fill="#1afa29" p-id="4573"></path></svg>
          </div>
          <div>
            <Link
              to="/Kambaz/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              A1
            </Link>
            <p className="wd-assignment-info">

              <p >  <span className="wd-not-available">   Multiple Modules </span>
                <span >
                  {" "} |{" "} Not available until May 6 at 12:00am {" "}
                  |{" "}
                </span>  </p>
              Due May 13 at 11:59pm | 100 pts
            </p>
          </div>
          <div className="wd-assignment-status">
            <span className="wd-check-icon">✓</span>
            <button className="wd-more-button">⋮</button>
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <div>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4572" width="15" height="15"><path d="M170.666667 345.6l243.2-243.2 59.733333 59.733333L256 384v349.866667h512v-298.666667h-256v-85.333333h341.333333v469.333333H170.666667V345.6z m298.666666 128h85.333334v85.333333h-85.333334v-85.333333z" fill="#1afa29" p-id="4573"></path></svg>
          </div>
          <div>
            <Link
              to="/Kambaz/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              A1
            </Link>
            <p className="wd-assignment-info">
              <p >  <span className="wd-not-available">   Multiple Modules </span>
                <span >
                  {" "} |{" "} Not available until May 6 at 12:00am {" "}
                  |{" "}
                </span>  </p>
              Due May 13 at 11:59pm | 100 pts
            </p>
          </div>
          <div className="wd-assignment-status">
            <span className="wd-check-icon">✓</span>
            <button className="wd-more-button">⋮</button>
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <div>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4572" width="15" height="15"><path d="M170.666667 345.6l243.2-243.2 59.733333 59.733333L256 384v349.866667h512v-298.666667h-256v-85.333333h341.333333v469.333333H170.666667V345.6z m298.666666 128h85.333334v85.333333h-85.333334v-85.333333z" fill="#1afa29" p-id="4573"></path></svg>
          </div>
          <div>
            <Link
              to="/Kambaz/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              A1
            </Link>
            <p className="wd-assignment-info">
              <p >  <span className="wd-not-available">   Multiple Modules </span>
                <span >
                  {" "} |{" "} Not available until May 6 at 12:00am {" "}
                  |{" "}
                </span>  </p>
              Due May 13 at 11:59pm | 100 pts
            </p>
          </div>
          <div className="wd-assignment-status">
            <span className="wd-check-icon">✓</span>
            <button className="wd-more-button">⋮</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

