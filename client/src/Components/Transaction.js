import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../Assets/css/Transaction.css";
import Sidebar from "./Sidebar";
import FadeLoader from "react-spinners/FadeLoader";
import _ from "lodash";
import Swal from "sweetalert2";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import * as AiIcons from "react-icons/ai";

const Transaction = () => {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [emptyTransactionMessage, setEmptyTransactionMessage] = useState();
  const [lastIndex, setLastIndex] = useState(10);
  const [firstIndex, setFirstIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);
  const [pageInput, setPageInput] = useState(1);
  const [errorResponse, setErrorResponse] = useState();
  const [search, setSearch] = useState("");
  const postPerPage = 10;

  useEffect(() => {
    if (_.isEmpty(search)) {
      setLoading(!loading);
      (async () => {
        try {
          var config = {
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          };
          const response = await fetch("users/v1/alltransactions", config);
          let responseData = await response.json();
          console.log("responseData", responseData);
          if (responseData.success === true) {
            setLoading(loading);
            setTransaction(responseData?.userlist);
          } else {
            throw Error("No data to display");
          }
        } catch (err) {
          setLoading(loading);
          setErrorResponse(err?.message);
        }
      })();
    }
  }, [search]);

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

  console.log("search", search);

  const onSearchClickHandler = async () => {
    setLoading(!loading);
    if (!_.isEmpty(search)) {
      (async () => {
        try {
          var config = {
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              email: search,
            }),
          };
          const response = await fetch("/users/v1/transactions", config);
          let responseData = await response.json();
          if (responseData.success === true) {
            setLoading(loading);
            if (!_.isEmpty(responseData.userlist)) {
              setTransaction(responseData?.userlist);
            } else {
              setEmptyTransactionMessage(
                `Opps..!!No Data found related to the ${search} id`
              );
            }
          } else {
            throw Error("No data to display");
          }
        } catch (err) {
          setLoading(loading);
          setErrorResponse(err?.message);
        }
      })();
    }
  };

  const clearInputButtonHandler = () => {
    setSearch("");
  };

  return (
    <>
      <div className="container-fluid transaction">
        <Sidebar />
        <div className={loading ? "loading" : ""}>
          <FadeLoader loading={loading} color="#3274ad" />
        </div>
        <div className="row d-flex justify-content-center">
          <div class="container table_body">
            <div className="row ">
              <div className="col-md-6 col-sm-8 col-lg-8">
                {" "}
                <h4
                  style={{
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                    marginBottom: "1.5rem",
                  }}
                >
                  Certificates Issued
                </h4>
              </div>
              <div className="col-md-6 col-sm-4 col-lg-4">
                {/* <div class="search">
                  <i class="fa fa-search"></i>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search By Email-id"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button class="btn btn-primary" onClick={() => setSearch("")}>
                    Clear
                  </button>
                  <button
                    class="btn btn-primary"
                    onClick={onSearchClickHandler}
                  >
                    <AiIcons.AiOutlineSearch
                      className="Sidebar_icons__2Z2FR"
                      style={{
                        color: "White",
                        height: "25",
                        width: "25",
                      }}
                    />
                  </button>
                </div> */}

                <div class="search">
                  {/* <i class="fa fa-search"></i> */}
                  <input
                    type="text"
                    required
                    class="search-box"
                    value={search}
                    placeholder="Search By Email-id"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    class="close-icon close-button"
                    onClick={() => setSearch("")}
                  >
                    <AiIcons.AiOutlineClose
                      className=""
                      style={{
                        color: "black",
                        height: "25",
                        width: "25",
                      }}
                    />
                  </button>
                  <button
                    class="btn btn-primary search-button text-center"
                    onClick={onSearchClickHandler}
                  >
                    <AiIcons.AiOutlineSearch
                      className=""
                      style={{
                        color: "White",
                        height: "25",
                        width: "25",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
            {/* <h4 style={{ color: "white",fontFamily: "Montserrat, sans-serif",marginBottom:'1.5rem' }}>Certificates Issued</h4> */}
            <div class="table-responsive">
              <table class="table transaction-table">
                <thead>
                  <tr
                    className="border-2 border-dark text-center my-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <th className="border-2 border-dark fs-5 text-capitalize">
                      Issue Date
                    </th>
                    <th className="border-2 border-dark fs-5 text-capitalize">
                      Transaction Hash
                    </th>
                    <th className="border-2 border-dark fs-5 text-capitalize">
                      Email Id
                    </th>
                    <th className="border-2 border-dark fs-5 text-capitalize">
                      Certificate Id
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emptyTransactionMessage ? (
                    <div className="empty_list">{emptyTransactionMessage}</div>
                  ) : (
                    <>
                      {transaction?.slice(firstIndex, lastIndex).map((Val) => {
                        return (
                          <>
                            <tr
                              className="border-2 border-dark text-center"
                              key={Val._id}
                            >
                              <td className="border-2 border-dark">
                                {Val.startdate}
                              </td>
                              <td className="border-2 border-dark txhash__link ">
                                <a
                                  href={`https://mumbai.polygonscan.com/tx/${Val.txhash}`}
                                  target="_blank"
                                >
                                  {Val.txhash}{" "}
                                </a>
                              </td>
                              <td className="border-2 border-dark">
                                {Val.email}
                              </td>
                              <td className="border-2 border-dark">
                                {Val.aadhar}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="my-3 text-center container">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <span
                  style={{
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
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
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Go to Page:
                </span>
                <form className="" onSubmit={onInputClick}>
                  <input
                    type="number"
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
