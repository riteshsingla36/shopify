import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentAdd, setCurrentAdd] = useState("");
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    axios
      .get(`/address?user=${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((data) => setAddresses(data.data))
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div>
      <h1>
        Address
        <button onClick={() => navigate("/create-address")}>
          Create Address
        </button>
      </h1>
      {addresses.map((address) => {
        return (
          <div key={address._id}>
            <input
              type="radio"
              value={address._id}
              name="adrs"
              onChange={() => {
                localStorage.setItem("address", JSON.stringify(address._id));
                setCurrentAdd(address._id);
              }}
              checked={
                JSON.parse(localStorage.getItem("address")) === address._id
              }
            />
            <h1>{address.name} </h1>
            <p>{address.area}</p>
          </div>
        );
      })}

      <button
        disabled={JSON.parse(localStorage.getItem("address")) ? false : true}
      >
        Proceed to pay
      </button>
    </div>
  );
};

export default Address;
