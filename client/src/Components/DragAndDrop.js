import React, { useEffect, useState } from 'react'
import { useDropzone } from "react-dropzone";
import './../Assets/css/ValidatorDashboard.css';
import image1 from './../Assets/images/swipe.png';
import image2 from './../Assets/images/checked.png';
import Sidebar from './Sidebar';

export default function DragAndDrop({ open }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});

const [modal, setModel] = useState(false);

    const files = acceptedFiles.map((file) => (

        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    const toggleModal = () => {
        setModel(!modal)
    };


    useEffect(() => {
        console.log(acceptedFiles);

        if(acceptedFiles.length > 0) {
            // toggleModal();
            // Swal.fire({
            //     title: 'Verified!',
            //     text: "This document is issued by XYZ organization on 26th July 2022",
            //     icon: 'success',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     cancelButtonText: 'Close',
            //     confirmButtonText: 'View on Etherum'
            //   }).then((result) => {
            //     if (result.isConfirmed) {
            //       Swal.fire(
            //         'Etherum',
            //         'Your file has been verified.',
            //         'success'
            //       )
            //     }
            //   })
        }else{
            // Swal.fire({
            //     position: 'center',
            //     icon: 'error',
            //     title: 'Invalid Doc!',
            //     showConfirmButton: false,
            //     showCancelButton: true,
            //     cancelButtonColor: '#d33',
            //     cancelButtonText: 'Close',
            //     timer: 1500
            //   })
        } 
    }, [acceptedFiles])
  return (
    <>
          <section className='big-banner'>

            <Sidebar/>
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
                            <ul>{files}</ul>
                        </aside>
                    </div>
                    {/* <button className="btn-modal" onClick={toggleModal}> Open</button> */}
                </div>
            </div>
            
            

            {modal && (
                
            <div className="model text-dark">
                <div onClick={toggleModal} className="overlay">
                    <div className="modal-content text-center">
                        <h2>SuccessFull</h2>
                        <img src={image2} className=' Drag-img' alt='drag'/>
                        <p> Doc-Verifird Successfully </p>
                        <button className='close-modal' onClick={toggleModal}>Close</button>
                    </div>
                </div>
            </div>
            )}

            </section>
    </>
  )
}
