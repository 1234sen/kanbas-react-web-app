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
      <a href="/labs" style={{ textDecoration: "none", color: "#666666", height: "21px" }}>Lab Exercises</a>
    </div>
  );
}

export default LandingPage;



