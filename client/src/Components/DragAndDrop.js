import React, { useState,useEffect } from 'react'
import { useDropzone } from "react-dropzone";
import './../Assets/css/ValidatorDashboard.css';
import image1 from './../Assets/images/swipe.png';
import ValidatorSidebar from './ValidatorSidebar';
import Swal from "sweetalert2";

export default function DragAndDrop({ open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles,fileRejections} =
    useDropzone({
      accept: {
        'pdf': ['.pdf'],
      }
    });
  const [issuerHashValue,setIssuerHashValue]=useState()
  const [issuerHashError,setIssuerHashError]=useState()
  const files = acceptedFiles.map((file) => (
    <p key={file.path}>
      {file.path}
    </p>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // <li key={file.path}>
    //   {file.path} - {file.size} bytes
    //   <ul>
    //     {errors.map(e => (
    //       <li key={e.code}>{e.message} </li>
    //     ))}
    //   </ul>
    // </li>
    <p className='fileError'>Only .pdf files format are accepted</p>
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
          let responseData = await response.json();
          if (responseData.success === true) {
            setIssuerHashValue(responseData.txhash);
          } else {
            throw Error(responseData.message);
          }
        } catch (err) {
          setIssuerHashError(err.message)
        }
      }
    })();
  }, [acceptedFiles]);

 
  
  useEffect(()=>{
      if (issuerHashValue && acceptedFiles.length > 0) {
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
                 window.open(`https://mumbai.polygonscan.com/tx/${issuerHashValue}`,"_blank")
            }
          })
      } else if(issuerHashError) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${issuerHashError}`,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Close',
            // timer: 3000
          })
      }
      setIssuerHashError("")
      setIssuerHashValue("")
  },[issuerHashValue,issuerHashError])

  return (
    <>
          <section className='big-banner'>
            <ValidatorSidebar/>
            <div className='boxes big-banner '>

                <div className='bg-light text-dark box p-3'>
                    <div {...getRootProps({ className: "dropzone " })} >
                        <input className="input-zone" {...getInputProps()} />
                        <img src={image1} className=' Drag-img' alt='drag'/>
                        <div className="text-center">
                            {isDragActive ? (
                            <p className="dropzone-content">
                                Release to drop the files here
                            </p>
                            ) : (
                            <p className="dropzone-content">
                                Drag’n’drop some files here <br/>, or click to select files
                            </p>
                            )}
                            <button type="button" onClick={open} className="btn btn-outline-primary mt-4 bg-dark text-light">
                            Select Files
                            </button>
                        
                        </div>
                        <aside>
                            <p className='text-center pt-3'>{files} {fileRejectionItems}</p>
                        </aside>
                    </div>
                </div>
            </div>
            </section>
    </>
  )
}
