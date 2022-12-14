import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../Assets/css/DashboardForm.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import FadeLoader from "react-spinners/FadeLoader";
import Sidebar from "./Sidebar";
import { v4 as uuidv4 } from 'uuid';

const DashboardForm = () => {
  const [showhide, setShowhide] = useState("Adhar");
  const [hashValue, setHashValue] = useState();
  const [validatorhashError, setValidatorHashError] = useState();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [certificateId,setCertificateId]=useState();

  const handleshowhide = (event) => {
    const getselect = event.target.value;
    setShowhide(getselect);
  };

  const validationSchema = Yup.object().shape({
    logo: Yup.mixed()
      .test("required", "Please select the file", (value) => {
        if (!value.length) {
          return false;
        } else {
          return true;
        }
      })

      .test("type", "Only .jpg and .png formats are accepted", (value) => {
        return (
          value &&
          (value?.[0]?.type === "image/jpeg" ||
            value?.[0]?.type === "image/png")
        );
      }),

    usertype: Yup.string().required("Please select certificate type"),

    emailAddress: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email"),

    adharNumber: Yup.string().when("usertype",{
      is: (val)=> val === 'Adhar',
      then: Yup.string().required("Please enter aadhar number field")
      .matches(
        /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
        "Please enter valid adhar number"),
     }),

    // adharNumber: Yup.string()
    //   .required("Please enter aadhar number field")
    //   .matches(
    //     /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
    //     "Please enter valid adhar number"
    //   ),
      
      

    

    certificateName: Yup.string().required("Please enter certificate name"),

    place: Yup.string().required("Please enter place field"),

    IssuedBy: Yup.string().required("Please fill this field"),

    nameOfPerson: Yup.string().required("Please enter name of person"),

    startDate: Yup.date().typeError("Please enter or select start date"),

    endDate: Yup.date()
      .typeError("Please enter or select end date")
      .min(Yup.ref("startDate"), "Please select valid end date"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, watch, formState } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    setLoading(!loading);
    setUserName(JSON.parse(localStorage.getItem("UserCredentials"))?.userName);
    try {
      var myStartDate = new Date(data?.startDate);
      var myEndDate = new Date(data?.endDate);
      const formData = new FormData();
      { showhide === "Adhar" ? formData.append("aadhar", data?.adharNumber) : formData.append("aadhar",certificateId )}
      formData.append("email", data?.emailAddress);
      formData.append("certname", data?.certificateName);
      formData.append("authority", data?.IssuedBy);
      formData.append("startdate", myStartDate?.toLocaleDateString());
      formData.append("enddate", myEndDate?.toLocaleDateString());
      formData.append("score", data?.place);
      formData.append("fileUploaded", data?.logo?.[0]);
      formData.append("personname", data?.nameOfPerson);

      const response = await fetch("users/v1/issue", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        setLoading(loading);
        let responseData = await response.json();
        // setCertificateId("")
        setHashValue(responseData.txhash);
      } else {
        throw Error("Something went wrong");
      }
    } catch (err) {
      setLoading(loading);
      setValidatorHashError(err.message);
    }
    reset();
  };

  useEffect(()=>{
    if(showhide ==="salesforce"){
      setCertificateId(uuidv4())
    }
  }
  ,[showhide])

  useEffect(() => {
    if (validatorhashError?.length && validatorhashError !== "") {
      Swal.fire({
        customClass:{
          title:"swal-title",
          text:"swal-text",
          popup:"swal-popup"
        },
        position: "center",
        icon: "error",
        title: "Something Went Wrong..!!",
        text:"There's some issue occured while processing your request,Please try again shortly",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
      });
    }
  }, [validatorhashError]);

  useEffect(() => {
    if (hashValue?.length && hashValue !== "") {
      Swal.fire({
        customClass:{
          title:"swal-title",
          text:"swal-text",
          popup:"swal-popup"
        },
        title: "Certificate Generated",
        position: "center",
        html: `Your blockchain-based certificate for user <strong>${userName}</strong> has been generated on Ethereum! It can be verified in one-click without any forgery. It has been shared with your subscriber on <strong>${userName}</strong>`,
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "View on Ethereum",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(
            `https://mumbai.polygonscan.com/tx/${hashValue}`,
            "_blank"
          );
        }
      });
    }
  }, [hashValue]);

  return (
    <>
      <section className="dashboard_form_section">
        {" "}
        <Sidebar />
        <div className="dashboard_form">
          <div className={loading && "loading"}>
            <FadeLoader loading={loading} />
          </div>
          <Container className="dashboard_form_body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <h3 className= "mb-3" style={{ textAlign: "start", color: "black"}}>
                  Dashboard
                </h3>
              </Row>
              <Row>
                <Col xs={12} lg={6} md={6} sm={6}>
                  <Form.Group className="mb-0">
                    <Form.Select
                      className="select_certificate"
                      name="usertype"
                      {...register("usertype")}
                      onChange={(e) => handleshowhide(e)}
                    >
                      <option value="">Select Certificate Type</option>
                      <option value="Adhar" selected>
                        Aadhar
                      </option>
                      <option value="salesforce">
                       Salesforce Certification
                      </option>
                      <option value="training">
                      Training
                      </option>
                      <option value="experience">
                        Experience
                      </option>
                      <option value="course">
                        Course
                      </option>
                      <option value="proof">
                        Employment Proof
                      </option>
                      <option value="medical_certificate">
                       Medical Certificate
                      </option>
                      <option value="provisional">
                       Provisional
                      </option>
                    </Form.Select>
                  </Form.Group>
                  <p className="select_error_masg">
                    {errors.usertype?.message}
                  </p>
                </Col>
              </Row>
              {(showhide === "Adhar" || showhide ==="salesforce" )&& (
                <>
                  <Row>
                    <Col lg={6} sm={6} md={6} xs={12}>
                      {
                        showhide ==="Adhar"?
                      <>
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">
                           Aadhar Number 
                        </Form.Label>
                        <input
                          type="text"
                          name="adharNumber"
                          className="form-control"
                          placeholder="Aadhar Number" 
                          {...register("adharNumber")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.adharNumber?.message}
                      </p>
                      </>
                      :
                      <>
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">
                         Certification Id
                        </Form.Label>
                        <input
                          type="text"
                          name="certification"
                          className="form-control"
                          placeholder={certificateId}
                            disabled
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.certification?.message}
                      </p>
                      </>
}
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">
                          Certificate Name
                        </Form.Label>

                        <input
                          type="text"
                          name="certificateName"
                          className="form-control"
                          placeholder="Enter Certificate Name"
                          {...register("certificateName")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.certificateName?.message}
                      </p>

                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Issued by</Form.Label>

                        <input
                          type="text"
                          name="IssuedBy"
                          className="form-control"
                          placeholder="Issued by"
                          {...register("IssuedBy")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.IssuedBy?.message}
                      </p>
                    
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Place</Form.Label>

                        <input
                          type="text"
                          name="place"
                          className="form-control"
                          placeholder="Enter Place"
                          {...register("place")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.place?.message}
                      </p>
                    </Col>
                    <Col lg={6} sm={6} md={6} xs={12}>
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Email Address</Form.Label>

                        <input
                          type="email"
                          name="emailAddress"
                          className="form-control"
                          placeholder="Enter Email Address"
                          {...register("emailAddress")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.emailAddress?.message}
                      </p>
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Start Date</Form.Label>

                        <input
                          type="date"
                          name="startDate"
                          className="form-control"
                          {...register("startDate")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.startDate?.message}
                      </p>
                     
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">End Date</Form.Label>

                        <input
                          type="date"
                          name="endDate"
                          className="form-control"
                          {...register("endDate")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.endDate?.message}
                      </p>
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Name of Person</Form.Label>{" "}
                        <input
                          type="text"
                          name="nameOfPerson"
                          className="form-control"
                          placeholder=" Enter person name"
                          {...register("nameOfPerson")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.nameOfPerson?.message}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-0">
                      <Form.Group controlId="formFile" className="mb-0">
                        <Form.Label className="mb-0">
                          Please upload your photo
                        </Form.Label>
                        <input
                          type="file"
                          className="chooseFile"
                          {...register("logo")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.logo?.message}
                      </p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Form.Group
                      className="mb-1"
                      controlId="submit"
                      style={{ textAlign: "center" }}
                    >
                      <Button
                        style={{ backgroundColor: "#3274ad" }}
                        className="dash_form_submit__btn"
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Row>
                </>
              )} 
            </form>
          </Container>
        </div>
      </section>
    </>
  );
};

export default DashboardForm;
