import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async () => {
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.text();
    setCredentials({ email: "", password: "" });
    localStorage.setItem("accessToken", data);
    toast("Regsiter successfull! 💪", { autoClose: 1000 });
    navigate("/home");
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.text();
    setCredentials({ email: "", password: "" });
    localStorage.setItem("accessToken", data);
    toast("Login successfull! 💪", { autoClose: 3000 });
    navigate("/home");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <div className="d-flex mt-2">
          <Button className="mr-2 btn-secondary" onClick={handleRegister}>
            Register
          </Button>
          <Button onClick={handleLogin}>Log In</Button>
        </div>
      </header>
    </div>
  );
}

export default Login;
