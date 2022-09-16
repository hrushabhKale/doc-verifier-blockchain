import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../Assets/css/Transaction.css";
import Sidebar from "./Sidebar";
import FadeLoader from "react-spinners/FadeLoader";
import _ from "lodash";
import Swal from "sweetalert2";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Transaction = () => {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [lastIndex, setLastIndex] = useState(10); // No of pages
  const [firstIndex, setFirstIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);
  const [pageInput, setPageInput] = useState(1);
  const [errorResponse, setErrorResponse] = useState();
  const postPerPage = 10;

  // useEffect(() => {
  //   setLoading(!loading);
  //   const fetchApi = async () => {
  //     const data = await fetch(
  //       "https://mocki.io/v1/b3706515-a786-4bb1-b575-d6266a88f0ce"
  //       // "users/v1/transactions"
  //     );
  //     const dataResponse = await data.json();
  //     setTransaction(dataResponse);
  //     setLoading(loading);
  //   };
  //   fetchApi();
  // }, []);

  useEffect(() => {
    (async () => {
      setLoading(!loading);
      try {
        var config = {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: JSON.parse(localStorage.getItem("UserCredentials"))
              ?.userName,
          }),
        };
        const response = await fetch("/users/v1/transactions", config);
        let responseData = await response.json();
        if (responseData.success === true) {
          setLoading(loading);
          console.log("DATAA", responseData);
          setTransaction(responseData?.userlist);
        } else {
          throw Error("No data to display");
        }
      } catch (err) {
        setLoading(loading);
        setErrorResponse(err?.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (errorResponse?.length && errorResponse !== "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${errorResponse}`,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
        timer: 2500,
      });
    }
    setErrorResponse("");
  }, [errorResponse]);

  console.log("transaction", transaction);

  useEffect(() => {
    if (currentPage === 0) {
      setPrevDisable(true);
    }
    if (TotalNumberOfPages.length) {
      if (currentPage === TotalNumberOfPages.length - 1) {
        setNextDisable(true);
      }
    }
  }, [currentPage]);

  const TotalNumberOfPages = [];
  for (let i = 1; i <= Math.ceil(transaction?.length / postPerPage); i++) {
    TotalNumberOfPages.push(i);
  }

  const onInputChange = (event) => {
    setPageInput(_.toNumber(event.target.value));
  };

  const onInputClick = (e) => {
    e.preventDefault();
    if (pageInput <= 0 || pageInput > TotalNumberOfPages.length) {
      setCurrentPage(0);
      setLastIndex(10);
      setFirstIndex(0);
      setPrevDisable(true);
      setNextDisable(false);
    } else {
      setCurrentPage(pageInput - 1);
      setLastIndex(pageInput * 10);
      setFirstIndex(pageInput * 10 - 10);
      setPrevDisable(false);
      setNextDisable(false);
    }
  };

  const prevChange = () => {
    if (firstIndex > 0 && lastIndex > 10) {
      setCurrentPage(currentPage - 1);
      setLastIndex(lastIndex - 10);
      setFirstIndex(firstIndex - 10);
      setPrevDisable(false);
      setNextDisable(false);
    } else if (firstIndex <= 0 && lastIndex <= 10) {
      setCurrentPage(currentPage);
      setLastIndex(lastIndex);
      setFirstIndex(firstIndex);
      setPrevDisable(true);
    }
  };

  const nextChange = () => {
    if (lastIndex < transaction?.length) {
      setCurrentPage(currentPage + 1);
      setLastIndex(lastIndex + 10); //end index point
      setFirstIndex(lastIndex); // start index point
      setPrevDisable(false);
      setNextDisable(false);
    } else {
      setNextDisable(true);
    }
  };

  return (
    <>
      <div className="container-fluid transaction">
        <Sidebar />
        <div className="row d-flex justify-content-center">
          <Table className="transaction-table mt-1 mb-0">
            <thead>
              <tr className="border-2 border-dark text-center my-2">
                <th className="col-3 border-2 border-dark fs-4 text-capitalize">
                  Issue Date
                </th>
                <th className="col-3 border-2 border-dark fs-4 text-capitalize">
                  Transaction Hash
                </th>
                <th className="col-3 border-2 border-dark fs-4 text-capitalize">
                  Email Id
                </th>
                <th className="col-3 border-2 border-dark fs-4 text-capitalize">
                  Certificate Id
                </th>
              </tr>
            </thead>
            <tbody>
              <div className={loading ? "loading" : ""}>
                <FadeLoader loading={loading} />
              </div>
              {transaction?.slice(firstIndex, lastIndex).map((Val) => {
                return (
                  <>
                    <tr
                      className="border-2 border-dark text-center"
                      key={Val._id}
                    >
                      <td className="border-2 border-dark text-capitalize">
                        {Val.startdate}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.txhash}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.email}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.aadhar}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <div className="my-3 text-center container">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <span style={{ color: "white" }}>
                  Page{" "}
                  <strong>
                    {currentPage + 1} of {`${TotalNumberOfPages.length}`}
                  </strong>{" "}
                  <span>|</span>
                </span>
                <span
                  style={{
                    color: "white",
                    marginLeft: "4px",
                    marginRight: "4px",
                  }}
                >
                  Go to Page:
                </span>
                <form className="" onSubmit={onInputClick}>
                  <input
                    type="text"
                    size={1}
                    placeholder={`${currentPage + 1}`}
                    value={pageInput}
                    onChange={onInputChange}
                    className="text-right"
                    style={{ width: "45px", height: "28px" }}
                  />
                </form>

                <button
                  className={`px-3 py-1 m-1 text-center btn btn-light nextPrev ${
                    prevDisable ? "disabled" : null
                  }`}
                  onClick={prevChange}
                >
                  <span style={{ color: "black" }}>
                    {" "}
                    <GrPrevious className="mb-2" />
                  </span>
                </button>
                <button
                  className={`px-3 py-1 m-1 text-center btn btn-light nextPrev ${
                    nextDisable ? "disabled" : null
                  }`}
                  onClick={nextChange}
                >
                  <span style={{ color: "black" }}>
                    {" "}
                    <GrNext className="mb-2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
