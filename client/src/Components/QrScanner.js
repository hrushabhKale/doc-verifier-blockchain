import React, { useState, useEffect, useRef, useReducer } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import Sidebar from "./Sidebar";
import styles from "./../Assets/css/QrScanner.module.css";
import image2 from "./../Assets/images/qr-code1.jpg";
import image1 from "./../Assets/images/qr-code.png";
import { QrReader } from "react-qr-reader";
import QrScanner from "qr-scanner";
import Swal from "sweetalert2";

export default function QrCodeScanner() {
  const [loading, setLoading] = useState(false);
  const [scanData, setScanData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState("");
  const [result, setResult] = useState("");
  const [isCameraAccessible, setIsCameraAccessible] = useState(false);
  const videoRef = useRef(null);

  const handleWebCamera = () => {
    setIsCameraAccessible(!isCameraAccessible);
  };

  const closecam = async () => {
    const video = document.getElementById("video");
    video?.srcObject?.getTracks()?.forEach(function (track) {
      track.stop();
    });
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => setScanData(result?.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(loading);
    if (scanData) {
      (async () => {
        try {
          var config = {
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              txhash: scanData,
            }),
          };
          const response = await fetch("users/v1/txhash", config);
          if (response.status === 200) {
            let responseData = await response.json();
            responseData?.userlist?.map((item) => setSuccessResponse(item));
            setLoading(!loading);
          } else {
            setLoading(loading);
            throw Error("Invalid Credentials !");
          }
        } catch (err) {
          setErrorResponse(err?.message);
        }
      })();
    }
    closecam();
  }, [scanData]);

  useEffect(() => {
    if (successResponse) {
      Swal.fire({
        title: "Details:",
        html: `<div><p><b>Email :</B> ${successResponse?.email}<br></p>
        <p><b>Aadhar :</b> ${successResponse?.aadhar}<br></p>
        <p><b>Created At :</b> ${successResponse?.createdAt}<br></p>
        <p><b>End date :</b> ${successResponse?.enddate}<br></p></div>
        <p><b>Tx hash :</b> ${successResponse?.txhash}<br></p></div>`,
        icon: "success",
        confirmButtonText: 'Ok',
        confirmButtonColor: "#28a745",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
      }).then(() => {
        window.location.reload();
      });
    }
    setScanData("");
  }, [successResponse]);

  return (
    <>
      <section className={styles.qr_background1}>
        <Sidebar />
        <div className="container-fluid">
          <div className="row">
            <div
              className={`col-6 col-md-6 p-5  ${styles.Qr_cam_Section} ${styles.qr_background}`}
            >
              <div class={`card ${styles.Qr_card}`}>
                {isCameraAccessible ? (
                  <QrReader
                    className={styles.qr_scanner_box}
                    videoStyle={{ top: "-22px" }}
                    ref={videoRef?.current}
                    onResult={(result, error) => {
                      if (!!result) {
                        setScanData(result?.text);
                      }
                      if (!!error) {
                        setErrorMessage("something Went Wrong");
                      }
                    }}
                  />
                ) : (
                  <img
                    class="card-img-top text-center"
                    src={image1}
                    alt="Card image cap"
                  />
                )}
                <div class="card-body">
                  <h5 class="card-title">Scan QR-Code with Webcam</h5>
                  <p class="card-text">
                    {isCameraAccessible
                      ? "Click to turn Off the camera"
                      : "Click to turn On the camera"}{" "}
                  </p>
                  <button
                    href="#"
                    className="btn btn-primary"
                    onClick={handleWebCamera}
                  >
                    {isCameraAccessible ? "Turn Off" : "Turn On"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`col-6 col-md-6 p-5 ${styles.qr_background} ${styles.Qr_cam_Section}`}
            >
              <div class={`card ${styles.Qr_card}`}>
                <img class="card-img-top" src={image2} alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title">Scan QR-code with Browse File</h5>
                  <p class="card-text">Click to Select file</p>

                  <input
                    type="file"
                    name="uploadfile"
                    id="img"
                    className="btn btn-primary"
                    style={{ display: "none" }}
                    onChange={(e) => handleUploadFile(e)}
                  />
                  <button class="btn btn-primary">
                    <label for="img">Select File</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
