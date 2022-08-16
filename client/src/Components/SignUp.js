import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import SignUpCss from "../Assets/css/SignUp.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    Select: Yup.string().required("Please select user type"),

    email: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email"),

    userName: Yup.string()
      .required("Please enter username field")
      .min(5, "Please enter username between 5 to 20 character")
      .max(20, "Please enter username between 5 to 20 character"),

    password: Yup.string()
      .required("Please enter password field")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9-!@#$%^&*]{8,20}$/,
        "Password should contain at least 1 uppercase, 1 lowercase, 1 digit, 1 symbol and length between 8 to 20"
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords don't match"
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("data", data);
    reset();
    navigate("/SecretTokenFile");
  };
  console.log(errors);

  return (
    <>
      <div className={SignUpCss.form__App}>
        <Container
          className={SignUpCss.signUp_box}
          style={{ minHeight: "39rem", maxHeight: "50rem",opacity:"0.9" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className={SignUpCss.singUp_header}>
              <h3 style={{ textAlign: "center", color: "white" }}>Sign Up</h3>
            </Row>
            <Row style={{ margin: "1rem",marginBottom:"0px" }}>
              <Form.Group className="mb-0">
                <Form.Label>User Type</Form.Label>
                <Form.Select name="usertype" className={SignUpCss.Select_heading} {...register("Select")}>
                  <option value="">Select User Type</option>
                  <option value="Issuer">Issuer</option>
                  <option value="Validator">Validator</option>
                </Form.Select>
              </Form.Group>
              <p className={SignUpCss.error_message}>
                {errors.Select?.message}
              </p>

              <Form.Group className="mb-0">
                <Form.Label>Email address</Form.Label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email")}
                />
              </Form.Group>
              <p className={SignUpCss.error_message}>{errors.email?.message}</p>

              <Form.Group className="mb-0">
                <Form.Label>User Name</Form.Label>

                <input
                  type="text"
                  name="userName"
                  className="form-control"
                  placeholder="Enter User Name"
                  {...register("userName")}
                />
              </Form.Group>
              <p className={SignUpCss.error_message}>
                {errors.userName?.message}
              </p>

              <Form.Group className="mb-0">
                <Form.Label>Password</Form.Label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password")}
                />
              </Form.Group>
              <p className={SignUpCss.error_message}>
                {errors.password?.message}
              </p>

              <Form.Group className="mb-2">
                <Form.Label>Confirm Password</Form.Label>

                <input
                  type="password"
                  name="confirmPass"
                  className="form-control"
                  placeholder="Confirm Password"
                  {...register("passwordConfirmation")}
                />
              </Form.Group>
              <p className={SignUpCss.error_message}>
                {errors.passwordConfirmation?.message}
              </p>

              <Form.Group
                className="mb-1"
                controlId="submit"
                style={{ textAlign: "center" }}
              >
                <Button
                  style={{ backgroundColor: "#3274ad" }}
                  className={SignUpCss.submit__btn}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form.Group>

              <Form.Group style={{ textAlign: "center" }}>
                <Form.Text className="text-muted">
                  Already Registered?
                </Form.Text>
                <Link to="/SignIn" className={SignUpCss.login__link} exact>
                  Login
                </Link>
              </Form.Group>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
};
export default SignUp;
