import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../Assets/css/Transaction.css";
import Sidebar from "./Sidebar";

const Transaction = () => {
  const [post, setPost] = useState([]);
  const [lastIndex, setLastIndex] = useState(10); // No of pages
  const [firstIndex, setFirstIndex] = useState(0);
  const [currentPage,setCurrentPage]=useState(0)
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable,setNextDisable]=useState(false)
  const postPerPage = 10;

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(
        // "https://mocki.io/v1/b3706515-a786-4bb1-b575-d6266a88f0ce"
        "https://mocki.io/v1/747e03c9-eae8-4bd3-9ea5-e75e262ecb89"
      );
      const dataJ = await data.json();
      setPost(dataJ);
    };
    fetchApi();
  }, []);

  const TotalNumberOfPages = [];
  for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
    TotalNumberOfPages.push(i);
  }

  const ChangePage = (page) => {
    setLastIndex(page);
    setFirstIndex(page - 10);
  };

  const nextChange = () => {
     if(lastIndex < post.length ){
      setCurrentPage(currentPage+1)
      setLastIndex(lastIndex + 10); //end index point
      setFirstIndex(lastIndex); // start index point
      setPrevDisable(false)
      setNextDisable(false);

     } 
     else{
        console.log("Next else")
      setNextDisable(true);
     }
   
  };

  useEffect(()=>{
    if(currentPage === 0 ){
        console.log("useEffect prev")
        setPrevDisable(true)
    }
    if(TotalNumberOfPages.length){
        if(currentPage === TotalNumberOfPages.length -1){
            console.log("useEffect next")
            setNextDisable(true)
        }
    }    
  },[currentPage])

  const prevChange = () => {

    if (firstIndex > 0 && lastIndex > 10) {
      setCurrentPage(currentPage - 1)
      setLastIndex(lastIndex - 10);
      setFirstIndex(firstIndex - 10);
      setPrevDisable(false);
      setNextDisable(false)
    } else if (firstIndex <= 0 && lastIndex <= 10) {
     setCurrentPage(currentPage)
      setLastIndex(lastIndex);
      setFirstIndex(firstIndex);
      setPrevDisable(true);
    }
  };

  return (
    <>
      <div className="container-fluid transaction">
        <Sidebar />
        <div className="row d-flex justify-content-center">
          <Table className="transaction-table mt-5">
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
              {post.slice(firstIndex, lastIndex).map((Val) => {
                return (
                  <>
                    <tr
                      className="border-2 border-dark text-center"
                      key={Val.Issue_Date}
                    >
                      <td className="border-2 border-dark text-capitalize">
                        {Val.Issue_Date}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.transaction_Hash}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.last_name}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.date_of_birth}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <div className="my-3 text-center">

          
            <button
              className={`px-3 py-1 m-1 text-center btn btn-success nextPrev ${prevDisable? "disabled" : null}`}
              onClick={prevChange}
              
              
            >
              Previous
            </button>

            {TotalNumberOfPages.map((Elem) => {
              return (
                <>
                  <button
                    className="px-3 py-1 m-1 text-center btn btn-secondary pageNo"
                    onClick={() =>{ setCurrentPage(Elem); ChangePage(Elem * 10)}}
                  >
                    {Elem}
                  </button>
                </>
              );
            })}
            <button
              className={`px-3 py-1 m-1 text-center btn btn-success nextPrev ${nextDisable? "disabled" : null}`}
              onClick={nextChange}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
