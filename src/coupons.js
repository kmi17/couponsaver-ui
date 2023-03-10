import React, { useEffect, useState } from "react";
import axios from "axios";

function Coupon() {
  const [companyName, setCompanyName] = useState("");
  const [validFrom, setValidFrom] = useState();
  const [expiration, setExpiration] = useState();
  const [code, setCode] = useState("");
  const [couponList, setCouponList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/coupons").then((response) => {
      console.log(response.data);
      setCouponList(response.data);
    });
  }, []);
    function handleSubmit(e) {
      e.preventDefault();
        console.log(companyName);
        const reqBody = {
          "company_name": companyName,
          "valid_from": validFrom,
          "expires_on": expiration, 
          "code": code
        };

        axios.post("http://localhost:8080/api/coupons", reqBody).then((response) => {
          console.log(response);
        })
    }
  return (
    <div className="Coupon">
      <h1>Coupon Saver</h1>
      <div>
        <h3>Your Coupons</h3>
       
          {couponList.map(function (coupon, index) {
            return <h5>{coupon.company_name}</h5>;
          })}
       
      </div>
      <form onSubmit={handleSubmit}>
        <hr></hr>
        <h3>Add Your Coupon</h3>
        <label>Company Name </label>
        <input
          type="text"
          name="company_name"
          onChange={(event) => setCompanyName(event.target.value)}
        ></input>

        <label> Valid From </label>
        <input
          type="date"
          name="valid_from"
          onChange={(event) => setValidFrom(event.target.value)}
        ></input>

        <label> Expiration </label>
        <input
          type="date"
          name="expires_on"
          onChange={(event) => setExpiration(event.target.value)}
        ></input>

        <label> Code </label>
        <input
          type="text"
          name="code"
          onChange={(event) => setCode(event.target.value)}
        ></input>
        <br></br>
        <br></br>
        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
}

export default Coupon;