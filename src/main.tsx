import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LabExercises from "./components/LabExercises";
import "./index.css";
import Lab1 from "./components/ Lab1.tsx";
import Lab2 from "./components/Lab2.tsx";
import Lab3 from "./components/Lab3.tsx";
import Kambaz from "./Kambaz/index";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/labs" element={<LabExercises />}>
          <Route path="lab1" element={<Lab1 />} />
          <Route path="lab2" element={<Lab2 />} />
          <Route path="lab3" element={<Lab3 />} />
        </Route>
        <Route path="/Kambaz/*" element={<Kambaz />} /> 
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

