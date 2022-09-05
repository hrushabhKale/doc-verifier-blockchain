import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Card, ModalBody, Col } from "react-bootstrap";
import SignCss from "../Assets/css/SignIn.module.css";
import { Modal, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
  const [modal, setmodal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse,setErrorResponse]=useState("");
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter your email")
    .email(" Please enter valid email"),

    password: Yup.string().required("Please enter your password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log("data", data);
    setErrorResponse("")
    try {
      var config = {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          password: data.password,
          email: data.userName,
        }),
      };
      const response = await fetch("/users/v1/login", config);
      if (response.status === 200) {
        let responseData = await response.json();
        console.log("Here", responseData.msg);
        setSuccessResponse(responseData.msg);
        if(responseData.type  === "issuer"){
            navigate('/Validator-Dashboard')
        }else{
          navigate('/DashboardForm')
        }
      } else {
        throw Error("Invalid Credentials!");
      }
    } catch (err) {
      console.log("error", err.message);
      setErrorResponse(err.message)
    }
    reset();
  };
  
const modalSubmit = (data) =>{
  console.log("data", data);
}

useEffect(()=>{
  if(errorResponse?.length && errorResponse!==''){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title:`${errorResponse}`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Close',
      timer: 2500
    })
  }
},[errorResponse])
const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('Please enter valid email');
    } else {
      setError(null);
    }

    setMessage(event.target.value);
  };

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={() => setmodal(!modal)}>
          <ModalHeader
            toggle={() => setmodal(!modal)}
            style={{ backgroundColor: "#3274ad" }}
          >
            <h4 style={{ textAlign: "center", color: "white" }}>
              Forget Password
            </h4>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={modalSubmit}>
              <Form.Group className="mb-3" controlId="popup_singIn_email">
                <Form.Label>Enter Email Id</Form.Label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email "
                  value={message}
                  onChange={handleChange}
                />
                {error && <span style={{color: 'red', fontSize:"14px"}}>{error}</span>}
              </Form.Group>
              <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    paddingLeft: "4rem",
                    paddingRight: "4rem",
                    backgroundColor: "#3274ad",
                  }}
                  // onClick={forgotPasswordHandler}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </ModalBody>
        </Modal>
      </div>
      <div className={SignCss.form__App}>
      
        <Container className={SignCss.signIn_box}>
      <Link to="/">
              <div class={SignCss.SignupScreen_homeBtn}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  width="30"
                  height="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
              </div>
            </Link>
          <Row>
            <Col
              className={SignCss.imglogo}
              style={{
                backgroundColor: "rgb(23 62 104",
                borderBottomLeftRadius: "4px",
                borderTopLeftRadius: "4px",
              }}
            >
              <img
                className={SignCss.image}
                src={require("../Assets/images/b-logo.png")}
                alt=""
                style={{
                  height: "200px",
                  width: "200px",
                  left: "4rem",
                  position: "relative",
                  top: "6rem",
                }}
              />
            </Col>
            <Col>
              <Row className={SignCss.singIn_header}>
                <h3 style={{ textAlign: "center", color: "white" }}>Sign In</h3>
              </Row>

              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "2rem" }}
              >
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email ID</Form.Label>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    placeholder="Enter User Name"
                    {...register("userName")}
                  />
                </Form.Group>
                <p className={SignCss.error_message}>
                  {errors.userName?.message}
                </p>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    {...register("password")}
                  />
                </Form.Group>
                <p className={SignCss.error_message}>
                  {errors.password?.message}
                </p>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <a
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setmodal(true)}
                  >
                    Forget Password
                  </a>
                </Form.Group>
                <Form.Group
                  className={SignCss.singIn_btn}
                  controlId="signIn-btn"
                >
                  <Button
                    type="submit"
                    className="btn-gradient-primary"
                    style={{ backgroundColor: "#3274ad" }}
                  >
                    Sign In
                  </Button>
                </Form.Group>
                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                  <Form.Text className="text-muted">
                    Don't have an account?
                  </Form.Text>

                  <Link
                    to="/SignUp"
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginLeft: "3px",
                    }}
                  >
                    Join now
                  </Link>
                </Form.Group>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default SignIn;
