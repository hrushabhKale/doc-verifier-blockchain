import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import style from "../Assets/css/ForgetPassword.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();

  const validationSchema = Yup.object().shape({
    secretToken: Yup.string().required("Please enter secret token"),

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

  const onSubmit = async (data) => {
    reset();
    setLoading(!loading);

    try {
      var config = {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secretToken: data?.secretToken,
          password: data?.password,
          confirmationPassword: data?.passwordConfirmation,
        }),
      };
      const response = await fetch("/users/v1/verifypasswd", config);
      let responseData = await response.json();
      if (responseData.success === true) {
        setLoading(loading);
        setSuccessResponse(responseData?.msg);
      } else {
        throw Error(responseData?.msg);
      }
    } catch (err) {
      setLoading(loading);
      setErrorResponse(err?.message);
    }
  };

  useEffect(() => {
    if (successResponse?.length && successResponse !== "") {
      Swal.fire({
        title:"Password Updated",
        text: `${successResponse}`,
        position: "center",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(() => {
        navigate("/SignIn");
      });
    }
  }, [successResponse]);

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
        timer: 2500,
      });
    }
    setErrorResponse("");
  }, [errorResponse]);

  return (
    <>
      <div className={style.form__App}>
        <div className={loading ? "loading" : ""}>
          <FadeLoader loading={loading} />
        </div>
        <Link to="/">
          <div class={style.forgrt_homeBtn}>
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
        <Container
          className={style.forgrtPass_box}
          style={{ minHeight: "39rem", maxHeight: "50rem", opacity: "0.9" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className={style.singUp_header}>
              <h3 style={{ textAlign: "center", color: "white" }}>
                Forgot Password
              </h3>
            </Row>
            <Row style={{ margin: "1rem", marginBottom: "0px" }}>
              <Form.Group className="mb-0">
                <Form.Label>Secret Token</Form.Label>

                <input
                  type="text"
                  name="secretToken"
                  className="form-control"
                  placeholder="Enter Secret Token"
                  {...register("secretToken")}
                />
              </Form.Group>
              <p className={style.error_message}>
                {errors.secretToken?.message}
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
              <p className={style.error_message}>{errors.password?.message}</p>

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
              <p className={style.error_message}>
                {errors.passwordConfirmation?.message}
              </p>

              <Form.Group
                className="mb-1"
                controlId="submit"
                style={{ textAlign: "center" }}
              >
                <Button
                  style={{ backgroundColor: "#3274ad" }}
                  className={style.submit__btn}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form.Group>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
};
export default ForgetPassword;
