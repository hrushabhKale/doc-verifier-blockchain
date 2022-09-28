import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./../Assets/css/ValidatorDashboard.css";
import image1 from "./../Assets/images/swipe.png";
import Swal from "sweetalert2";
import FadeLoader from "react-spinners/FadeLoader";
import Sidebar from "./Sidebar";

export default function DragAndDrop({ open }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      pdf: [".pdf"],
    },
  });
  const [issuerHashValue, setIssuerHashValue] = useState();
  const [issuerHashError, setIssuerHashError] = useState();
  const [loading, setLoading] = useState(false);

  const fileRejectionItems = fileRejections?.map(({ file, errors }) => (
    <p className="fileError">Only .pdf files format are accepted</p>
  ));

  useEffect(() => {
    (async () => {
      if (acceptedFiles?.length > 0) {
        setLoading(!loading);
        try {
          const formData = new FormData();
          formData.append("fileUploaded", acceptedFiles?.[0]);

          const response = await fetch("users/v1/validator", {
            method: "POST",
            body: formData,
          });
          let responseData = await response?.json();
          if (responseData.success === true) {
            setLoading(loading);
            setIssuerHashValue(responseData?.txhash);
          } else {
            throw Error(responseData?.message);
          }
        } catch (err) {
          setLoading(loading);
          setIssuerHashError(err?.message);
        }
      }
    })();
  }, [acceptedFiles]);

  useEffect(() => {
    if (issuerHashValue) {
      Swal.fire({
        title: "Valid Document",
        text: "The uploaded document is genuine",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
        confirmButtonText: "View on Etherum",
      }).then((result) => {
        if (result?.isConfirmed) {
          window.open(
            `https://mumbai.polygonscan.com/tx/${issuerHashValue}`,
            "_blank"
          );
        }
      });
    } 
    setIssuerHashValue("")
  }, [issuerHashValue]);

  useEffect(()=>{
    if (issuerHashError && issuerHashError?.length) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Document",
        text:'The file you have uploaded is not a genuine certificate. Please upload a valid file.',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
      });
    }
    setIssuerHashError("");
  },[issuerHashError])

  return (
    <>
      <section className="big-banner">
        <Sidebar />
        <div className="boxes big-banner ">
          <div className={loading && "loading"}>
            <FadeLoader loading={loading} />
          </div>

          <div className="bg-light text-dark box p-3">
            <div {...getRootProps({ className: "dropzone " })}>
              <input className="input-zone" {...getInputProps()} />
              <img src={image1} className=" Drag-img" alt="drag" />
              <div className="text-center p-4">
                {isDragActive ? (
                  <p className="dropzone-content">
                    Release to drop the files here
                  </p>
                ) : (
                  <>
                    <p className="dropzone-content">
                      Drag & drop some files here
                    </p>
                    <p className="dropzone-content">
                      , or click to select files
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={open}
                  className="btn btn-outline-primary mt-4 bg-dark text-light"
                >
                  Select Files
                </button>
              </div>
              <aside>
                <p className="text-center pt-3">{fileRejectionItems}</p>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
