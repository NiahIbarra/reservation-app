import React, { useState } from "react";
import { searchReservation } from "./utils/api";
import Reservation from "./Reservation";
import { mobileValidate } from "./utils/validate";

export default function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [submit, setSubmit] = useState(false);
  const phoneChange = (event) => {
    let phoneNumber1 = event.target.value;
    phoneNumber1 = mobileValidate(phoneNumber1, phoneNumber.length);
    event.target.value = phoneNumber1;
    setPhoneNumber(phoneNumber1);
  };
  const theSubmit = (event) => {
    event.preventDefault();
    searchReservation(phoneNumber)
      .then((data) => {
        setReservations(data);
      })
      .then(setSubmit(true));
  };
  return (
    <div>
      <h2>Search</h2>
      <form name="reservation" onSubmit={theSubmit}>
        <input
          className="form-control col-sm-6 col-md-5 col-lg-3"
          type="text"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={phoneChange}
          value={phoneNumber}
        ></input>
        <button type="submit" className="btn btn-primary mt-2">
          Find
        </button>
      </form>
      {submit ? (
        reservations.length ? (
          <div>
            {reservations.map((reservation, idx) =>
              reservation.status === " finished" ? null : (
                <Reservation key={idx} data={reservation} />
              )
            )}
          </div>
        ) : (
          <div> No reservations found</div>
        )
      ) : null}
    </div>
  );
}
