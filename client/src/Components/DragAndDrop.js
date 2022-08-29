import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./../Assets/css/ValidatorDashboard.css";
import image1 from "./../Assets/images/swipe.png";
import ValidatorSidebar from "./ValidatorSidebar";
import Swal from "sweetalert2";

export default function DragAndDrop({ open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});
  const [issuerHashValue,setIssuerHashValue]=useState()
  const [issuerHashError,setIssuerHashError]=useState()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    (async () => {
      if (acceptedFiles.length > 0) {
        try {
          const formData = new FormData();
          formData.append("fileUploaded", acceptedFiles?.[0]);

          const response = await fetch("users/v1/validator", {
            method: "POST",
            body: formData,
          });
          if (response.status === 200) {
            let responseData = await response.json();
            console.log("Here", responseData.txhash);
            setIssuerHashValue(responseData.txhash);
          } else {
            throw Error("Invalid Doc!");
          }
        } catch (err) {
          setIssuerHashError(err.message)
        }
      }
    })();
  }, [acceptedFiles]);

  useEffect(()=>{
    if(issuerHashValue){
      if (acceptedFiles.length > 0) {
        Swal.fire({
            title: 'Verified!',
            text: "This document is verified Successfully",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Close',
            confirmButtonText: 'View on Etherum'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location=`https://mumbai.polygonscan.com/tx/${issuerHashValue}`
            }
          })
      } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${issuerHashError}`,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Close',
            timer: 1500
          })
      }
    }
  },[issuerHashValue])

  return (
    <>
      <section className="big-banner">
        <ValidatorSidebar />
        <div className="boxes big-banner ">
          <div className="bg-light text-dark box p-3">
            <div {...getRootProps({ className: "dropzone " })}>
              <input className="input-zone" {...getInputProps()} />
              <img src={image1} className=" Drag-img" alt="drag" />
              <div className="text-center">
                {isDragActive ? (
                  <p className="dropzone-content">
                    Release to drop the files here
                  </p>
                ) : (
                  <p className="dropzone-content">
                    Drag’n’drop some files here <br />, or click to select files
                  </p>
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
                <ul>{files}</ul>
              </aside>
              
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
}
