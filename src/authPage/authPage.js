import { Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./authPage.module.css";
import axios from "axios";

function AuthPage() {
  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });

  const handleLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const submitLoginForm = () => {
    // console.log(loginForm);
    axios
      .post("http://localhost:1337/auth/local", { ...loginForm })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.jwt);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <div className={`d-flex justify-content-center`}>
            <div className={style.loginForm}>
              <h3>Login</h3>
              <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email Address or username</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    onChange={(event) => handleLoginForm(event)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => handleLoginForm(event)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => submitLoginForm()}>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default AuthPage;
