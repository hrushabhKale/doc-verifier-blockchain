import React from 'react';
import Table from 'react-bootstrap/Table';
import "../Assets/css/Transaction.css";

const Transaction = () => {
  return (
    <div className='transaction'>
        <Table striped bordered hover className='transaction-table'>
      <thead>
        <tr>
          <th>Issue Date </th>
          <th>Transaction Hash</th>
          <th>Email Id </th>
          <th>Certificate Id</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>22/02/2022</td>
          <td>56546dwdwd</td>
          <td>vrahane8@gmail.com</td>
          <td>12345679</td>
        </tr>
        <tr>
        <td>22/02/2022</td>
          <td>56546dwdwd</td>
          <td>vrahane8@gmail.com</td>
          <td>12345679</td>
        </tr>
        <tr>
        <td>22/02/2022</td>
          <td>56546dwdwd</td>
          <td>vrahane8@gmail.com</td>
          <td>12345679</td>
        </tr>
      </tbody>
    </Table>
    
    </div>
  )
}

export default Transaction