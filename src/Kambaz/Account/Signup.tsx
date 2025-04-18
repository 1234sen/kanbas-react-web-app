// 修改 src/Kambaz/Account/Signup.tsx 文件

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FormControl, Form } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({
    role: "STUDENT" // 默认角色为学生
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>

      <FormControl
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="Username"
      />

      <FormControl
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="Password"
        type="password"
      />

      <FormControl
        value={user.firstName || ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        className="mb-2"
        placeholder="First Name"
      />

      <FormControl
        value={user.lastName || ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        className="mb-2"
        placeholder="Last Name"
      />

      <FormControl
        value={user.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-2"
        placeholder="Email"
        type="email"
      />

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          value={user.role || "STUDENT"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </Form.Select>
      </Form.Group>

      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </button>

      <br />
      <Link to="/Kambaz/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}