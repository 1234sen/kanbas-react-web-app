import { Provider } from 'react-redux';
import store from './Kambaz/store';'';
// import React from "react";
// import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LabExercises from "./components/LabExercises";
// import "./index.css";

import Lab2 from "./components/Labs/Lab2/index.tsx";
import Lab3 from "./components/Labs/Lab3/index.tsx";
import Kambaz from "./Kambaz/index";
// import "./index.css";
import Lab1 from "./components/Labs/Lab1/index.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Lab4 from "./components/Labs/Lab4/index.tsx";
import Lab5 from "./components/Labs/Lab5/index.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/labs" element={<LabExercises />}>
          <Route path="lab1" element={<Lab1 />} />
          <Route path="lab2" element={<Lab2 />} />
          <Route path="lab3" element={<Lab3 />} />
          <Route path="lab4" element={<Lab4 />} />
          <Route path="lab5" element={<Lab5 />} />
        </Route>
        <Route path="/Kambaz/*" element={<Kambaz />} />
      </Routes>
    </HashRouter>
  </StrictMode></Provider>
);



