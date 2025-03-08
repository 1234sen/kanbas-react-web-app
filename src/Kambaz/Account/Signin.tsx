import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button } from "react-bootstrap";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      user => user.username === credentials.username &&
        user.password === credentials.password
    );
    if (user) {
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Account/Profile");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value
        })}
        className="mb-2"
      />
      <Form.Control
        id="wd-password"
        type="password"
        placeholder="password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        className="mb-2"
      />
      <Button
        id="wd-signin-btn"
        onClick={signin}
        className="btn btn-primary w-100 mb-2">
        Sign in
      </Button>
    </div>
  );
}
