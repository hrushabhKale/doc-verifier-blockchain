import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Card, ModalBody, Col } from "react-bootstrap";
import SignCss from "../Assets/css/SignIn.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FadeLoader from "react-spinners/FadeLoader";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState("");

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Please enter your email")
      .email(" Please enter valid email"),

    password: Yup.string().required("Please enter your password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    setErrorResponse("");
    setLoading(!loading);
    try {
      var config = {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          password: data?.password,
          email: data?.userName,
        }),
      };
      const response = await fetch("/users/v1/login", config);
      if (response.status === 200) {
        let responseData = await response.json();
        setSuccessResponse(responseData?.msg);
        setLoading(!loading);
        localStorage.setItem(
          "UserCredentials",
          JSON.stringify({
            email: `${data?.userName}`,
            userName: `${responseData?.username}`,
            type: `${responseData?.type}`,
          })
        );
        if (responseData.type === "issuer") {
          navigate("/Issuer-Dashboard");
        } else {
          navigate("/Validator-Dashboard");
        }
      } else {
        setLoading(loading);
        throw Error("Invalid Credentials!");
      }
    } catch (err) {
      setErrorResponse(err?.message);
    }
    reset();
  };

  useEffect(() => {
    if (errorResponse?.length && errorResponse !== "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${errorResponse}`,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
      });
    }
  }, [errorResponse]);

  const forgotPass = async () => {
    const { value: email } = await Swal.fire({
      title: "Forgot Password",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Submit",
    });

    if (email) {
      setLoading(!loading);
      try {
        var config = {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: email,
          }),
        };
        const response = await fetch("/users/v1/forgotpasswd", config);
        let responseResult = await response.json();
        if (responseResult?.success === true) {
          setSuccessResponse(responseResult?.msg);
          setLoading(loading);
        } else {
          setLoading(loading);
          throw Error(responseResult?.msg);
        }
      } catch (err) {
        setErrorResponse(err?.message);
      }
    }
  };

  useEffect(() => {
    if (successResponse?.length && successResponse !== "") {
      Swal.fire({
        title:
          "Secret Token is send on your registered email Id,please Check..!!",
        position: "center",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(() => {
        navigate("/ForgetPassword");
      });
    }
  }, [successResponse]);

  return (
    <>
      <div className={SignCss.form__App}>
        <div className={loading ? "loading" : ""}>
          <FadeLoader loading={loading} />
        </div>

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
                    style={{ color: "blue", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}
                    onClick={forgotPass}
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
                  <Form.Text className="text-muted" style={{ fontFamily: "Montserrat, sans-serif"}}>
                    Don't have an account?
                  </Form.Text>

                  <Link
                    to="/SignUp"
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginLeft: "3px",
                      fontFamily: "Montserrat, sans-serif"
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
