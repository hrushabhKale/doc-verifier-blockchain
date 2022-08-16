import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Card, ModalBody, Col } from "react-bootstrap";
import SignCss from "../Assets/css/SignIn.module.css";
import { Modal, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn = () => {
  const [modal, setmodal] = useState(false);
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Please enter your email"),
      

    password: Yup.string().required("Please enter your password"),
    email: Yup.string()
      .required("email is required")
      .email("Enter valid email"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("data", data);
    reset();
  };

  const forgotPasswordHandler = (e) => {
    e.preventDefault();

    // 



  }

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={() => setmodal(!modal)}>
          <ModalHeader
            toggle={() => setmodal(!modal)}
            style={{ backgroundColor: "#3274ad"  }}
          >
            <h4 style={{ textAlign: "center",color: "white" }}>Forget Password</h4>
          </ModalHeader>
          <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="popup_singIn_email">
              <Form.Label>Enter Email Id</Form.Label>
              <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email "
                  {...register("email")}
                />
            </Form.Group>
            <p className={SignCss.error_message}>{errors.email?.message}</p>
            <Form.Group className="mb-3" style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ paddingLeft: "4rem", paddingRight: "4rem",backgroundColor: "#3274ad" }}
                onClick={forgotPasswordHandler}
              >
                Submit
              </Button>
            </Form.Group>
            </Form>
          </ModalBody>
        </Modal>
      </div>
      <div className={SignCss.form__App}>
      <Container
        className={SignCss.signIn_box}
      
      >
        <Row>
          <Col className={SignCss.imglogo} style={{backgroundColor:"rgb(23 62 104",borderBottomLeftRadius: "4px",borderTopLeftRadius: "4px"
}}>
          <img
          className={SignCss.image}
          src={require('../Assets/images/b-logo.png')}
          alt=""
          style={{height:"200px",width:"200px",left:'4rem',position:'relative',top:"6rem"}}
        />
          </Col>
          <Col>
          <Row className={SignCss.singIn_header}>
              <h3 style={{ textAlign: "center",color:"white" }}>Sign In</h3>
            </Row>

        <Form onSubmit={handleSubmit(onSubmit)} style={{margin: "2rem"}}>
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
          <p className={SignCss.error_message}>{errors.userName?.message}</p>

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
          <p className={SignCss.error_message}>{errors.password?.message}</p>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setmodal(true)}
            >
              Forget Password
            </a>
          </Form.Group>
          <Form.Group className={SignCss.singIn_btn} controlId="signIn-btn">
            <Button type="submit" className="btn-gradient-primary" style={{backgroundColor: "#3274ad"}}>
              Sign In
            </Button>
          </Form.Group>
          <Form.Group className="mb-3" style={{ textAlign: "center" }}>
            <Form.Text className="text-muted">Don't have an account?</Form.Text>

            <Link to="/SignUp" style={{ color: "blue", cursor: "pointer", marginLeft:"3px"}}>Join now</Link>
          </Form.Group>
        </Form>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};
export default SignIn;
