import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
      }}
    >
      <h1 style={{ margin: "0", padding: "0", marginRight: "30px", color: "black"}}>
        Welcome to Kambaz Application
      </h1>
      <Link to="/labs" style={{ textDecoration: "none", color: "#666666", height: "21px" }}>Lab Exercises</Link>
   
     <div className="mt-3">
        <div>name: sen jiang</div>
        <div>
          <a href="https://github.com/1234sen/kanbas-react-web-app/tree/project" target="_blank" rel="noopener noreferrer">
            https://github.com/1234sen/kanbas-react-web-app/tree/project
          </a>
        </div>
        <div>
          <a href="https://github.com/1234sen/nodeserver_1_3" target="_blank" rel="noopener noreferrer">
            https://github.com/1234sen/nodeserver_1_3
          </a>
        </div>
      </div>
    
    </div>
  );
}

export default LandingPage;



