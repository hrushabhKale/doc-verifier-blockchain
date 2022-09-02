import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignCss from "../Assets/css/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DotLoader from "react-spinners/DotLoader";

const SecretTokenFile = () => {
  //   const [modal, setmodal] = useState(false);
  const [errorResponse,setErrorResponse]=useState()
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    SecretToken: Yup.string()
    .required("Please enter secret token")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit =async (data) => {
    setLoading(!loading)
    try {
      var config = {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secretToken: data?.SecretToken
        }),
      };
      const response = await fetch("/users/v1/verify", config);
      let responseData = await response.json();
      if (responseData.success === true) {
        console.log("Here", responseData.msg);
        // setSuccessResponse(responseData.msg);
        setLoading(loading)
        navigate("/SignIn")
      } else {
        throw Error(responseData.message);
      }
    } catch (err) {
      console.log("error", err.message);
      setLoading(loading)
      setErrorResponse(err.message)
    }
    // reset();
  };

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
        // timer: 2500
      })
    }
    setErrorResponse("")
  },[errorResponse])

  const SubmitHandler = (e) => {
    e.preventDefault();

    //
  };

  return (
    <>
    <div className={SignCss.secret_form__App}>
      <Container
        className={SignCss.secret__token__box}
        style={{ minHeight: "21rem", width: "27rem", maxHeight: "45rem" }}
      >
        <Row
          style={{
            backgroundColor: "#3274ad",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            padding: "5px",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ textAlign: "center",color:'white' }}>Secret Token</h3>
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-1" controlId="popup_singup_secret_token">
            <Form.Label>My Secret Token</Form.Label>
            <Form.Control type="text" placeholder="Enter Secret Token"  {...register("SecretToken")} />
          </Form.Group>
          <Form.Group
            className="mb-0"
            style={{ textAlign: "center" }}
           
          >
          <p style={{color: "red",textAlign: "initial"}}>{errors.SecretToken?.message}</p>
            <Button
              variant="primary"
              className="mb-3"
              type="submit"
              style={{ paddingLeft: "4rem", paddingRight: "4rem",backgroundColor: "#3274ad"}}
            //   onClick={SubmitHandler}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
        <p style={{ textAlign: "center", marginBottom: "0px" }}>
          Please check your registered email ID for token.
        </p>
        <p style={{ textAlign: "center" }}>
          Check the spam folder if not found
        </p>
      </Container>
      <DotLoader loading={loading} size={60} />
      </div>
    </>
  );
};
export default SecretTokenFile;
