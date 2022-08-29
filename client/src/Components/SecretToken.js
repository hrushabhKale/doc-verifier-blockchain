import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignCss from "../Assets/css/SignIn.module.css";

const SecretTokenFile = () => {
  const [isSuccessResponse,setIsSuccessResponse]=useState()
  //   const [modal, setmodal] = useState(false);
  const validationSchema = Yup.object().shape({
    SecretToken: Yup.string()
    .required("Please enter secret token")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit =async (data) => {
    console.log("data", data);
    // try {
    //   const response = await axios.post(
    //     "users/verify",
    //     data
    //   );
    //   console.log("response",response)
    //   if(response.status === 200){
    //     setIsSuccessResponse(response)
    //   }
    // } catch (error) {
    //   const errors = error.response.data.msg;
    //   if (errors) {
    //     console.log("error",error.response)
    //     // return error.response;
    //   }
    // }
    reset();
  };

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
      </div>
    </>
  );
};
export default SecretTokenFile;
