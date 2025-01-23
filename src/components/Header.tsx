import React from "react";

const Header: React.FC = () => {

  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: "white", 
        padding: "10px 20px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)", 
      }}
    >
      <h2 style={{ margin: "0", fontWeight: "bold", color: "black"}}>Lab Exercises</h2>

    </div>
  );
};

export default Header;

