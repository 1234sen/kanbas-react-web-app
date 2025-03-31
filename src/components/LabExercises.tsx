import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const LabExercises: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: "white",
      minHeight: "100vh",
      width: "100vw",
      margin: "0",
      padding: "20px",
      boxSizing: "border-box",
      position: "relative"
    }}>
      <nav
        style={{
          position: "absolute",
          top: "39.5px",
          left: "260px",
          width: "100%",
          display: "flex",
          gap: "20px",
          zIndex: 1000
        }}
      >
        <Link to="lab1" style={{ textDecoration: "none", color: "black" }}>Lab 1</Link>
        <Link to="lab2" style={{ textDecoration: "none", color: "black" }}>Lab 2</Link>
        <Link to="lab3" style={{ textDecoration: "none", color: "black" }}>Lab 3</Link>
        <Link to="lab4" style={{ textDecoration: "none", color: "black" }}>Lab 4</Link>
        <Link to="lab5" style={{ textDecoration: "none", color: "black" }}>Lab 5</Link>
        <li><Link to="/Kambaz">Kambaz</Link></li>
      </nav>
      <button
        onClick={() => navigate(-1)} // back
        style={{
          position: "absolute",
          top: "39.5px",
          right: "29px",
          display: "flex",
          color: "white",
          background: "#808080",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "5px",
          padding: "5px 15px",
          zIndex: 1000,
        }}
      >
        Back
      </button>
      {/* Header */}
      <Header />
      <p style={{ marginTop: "10px", fontWeight: "bold", marginLeft: "5px", color: "black" }}>
        <strong>Full Name:</strong> Sen Jiang
        <br />
        <strong>Section:</strong> [SEC 02]
      </p>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        {location.pathname === "/labs" && (
          <>

            <h3 style={{ textAlign: "left", marginBottom: "20px", color: "black" }}>
              Lab 1: HTML Examples
            </h3>
            <p style={{ textAlign: "left", color: "black" }}>
              Text documents are often broken up into several sections and subsections. Each section is usually prefaced with
              a short title or heading that attempts to summarize the topic of the section it precedes. For instance, this
              paragraph is preceded by the heading <strong>Heading Tags</strong>. The font of the section headings are
              usually larger and bolder than their subsection headings.
            </p>
            <p id="wd-p-2">
              This is the first paragraph. The paragraph tag is used to format
              vertical gaps between long pieces of text like this one.
            </p>
            <p id="wd-p-3">
              This is the second paragraph. Even though there is a deliberate white
              gap between the paragraph above and this paragraph, by default
              browsers render them as one contiguous piece of text as shown here on
              the right.
            </p>
            <p id="wd-p-4">
              This is the third paragraph. Wrap each paragraph with the paragraph
              tag to tell browsers to render the gaps.
            </p>
          </>
        )}
        <p>
          <a href="https://github.com/1234sen/kanbas-react-web-app.git" style={{ textDecoration: "none", color: "black" }}>
            Source Code Repository
          </a>
        </p>
        <p>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>Landing Page</a>
        </p>
        <Outlet />
      </div>
    </div>
  );
};

export default LabExercises;


