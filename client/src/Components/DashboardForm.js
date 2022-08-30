import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../Assets/css/DashboardForm.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import IssuerSidebar from "./IssuerSidebar";
import { Link } from "react-router-dom";

const DashboardForm = () => {
  const [showhide, setShowhide] = useState("");

  const handleshowhide = (event) => {
    const getselect = event.target.value;

    setShowhide(getselect);
  };

  const validationSchema = Yup.object().shape({
    logo: Yup.mixed()
    .test("required", "Please select the file", (value) =>{
   if (!value.length){
    return false
   }
   else{
    return true
   }
    })

    .test("type", "Only .jpg and .png formats are accepted", (value) => {
      console.log("value", value.type);
      return value && (
          value?.[0]?.type === "image/jpeg" ||
          value?.[0]?.type === "image/png" 
      );
  }),

    usertype: Yup.string().required("Please select certificate type"),

    emailAddress: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email"),

    adharNumber: Yup.string()
      .required("Please enter aadhar number field")
      .matches(
        /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
        "Please enter valid adhar number"
      ),

    certificateName: Yup.string().required("Please enter certificate name"),

    startDate: Yup.string().required("Please enter or select start date"),

    place: Yup.string().required("Please enter place field"),

    IssuedBy: Yup.string().required("Please fill this field"),

    endDate: Yup.string().required("Please enter or select date"),

    nameOfPerson: Yup.string().required("Please enter name of person"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, watch, formState } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("file:", watch("logo"));
    console.log("data", data);
    console.warn("uploaded file", watch("logo"));
    reset();

    Swal.fire({
      title: "Certificate Generated",
      position: "center",
      html:
        "Your blockchain-based certificate for user username has been generated on Ethereum! It can be verified in one-click without any forgery. It has been shared with your subsriber on" +
        '<a href="#">text@example.com</a> ',
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "View on Ethereum",
    }).then((result) => {
      if (result.isConfirmed) {
        alert("thank you");
      }
    });
  };

  useEffect(() => {}, []);
  return (
    <>
      <section className="dashboard_form_section">
        {" "}
        <IssuerSidebar />
        <div className="dashboard_form">
          <Container className="dashboard_form_body">
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <h4 style={{ textAlign: "start", color: "black" }}>
                  Dashboard
                </h4>
              </Row>
              <Row>
                <Col xs={12} lg={6} md={6} sm={6}>
                  <Form.Group className="mb-0">
                    {/* <Form.Label>User Type</Form.Label> */}
                    <Form.Select
                      className="select_certificate"
                      name="usertype"
                      {...register("usertype")}
                      onChange={(e) => handleshowhide(e)}
                    >
                      <option value="">Select Certificate Type</option>
                      <option value="Adhar">Aadhar</option>
                      <option value="xyz">xyz</option>
                    </Form.Select>
                  </Form.Group>
                  <p className="select_error_masg">
                    {errors.usertype?.message}
                  </p>
                </Col>
              </Row>
              {showhide === "Adhar" && (
                <>
                  <Row>
                    <Col lg={6} sm={6} md={6} xs={12}>
                      <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Aadhar Number</Form.Label>
                        <input
                          type="text"
                          name="adharNumber"
                          className="form-control"
                          placeholder="Enter Aadhar Number"
                          {...register("adharNumber")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.adharNumber?.message}
                      </p>

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
                          Please upload logo
                        </Form.Label>
                        <input
                          type="file"
                          className="chooseFile"
                          // name='logo'
                          {...register("logo")}
                        />
                      </Form.Group>
                      <p className="select_error_masg">
                        {errors.logo?.message}
                        {/* {errors.logoFile && <p>{errors.logoFile?.message}</p>} */}
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
