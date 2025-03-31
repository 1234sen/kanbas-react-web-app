import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button } from "react-bootstrap";
import * as db from "../Database";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;

      // 确保先完成dispatch，再进行导航
      dispatch(setCurrentUser(user));

      // 使用setTimeout确保Redux状态更新完成后再导航
      setTimeout(() => {
        navigate("/Kambaz/Dashboard");
      }, 100);
    } catch (error) {
      console.error("登录失败:", error);
      // 可以添加错误提示
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
