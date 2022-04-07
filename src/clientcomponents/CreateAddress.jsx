import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAddress = () => {
  const [name, setName] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAddress = () => {
    if (!name || !flat || !area || !city || !state || !pincode || !mobile) {
      setError(true);
      return false;
    }
    axios
      .post(
        "/address",
        {
          name: name,
          flat_no: flat,
          area: area,
          city: city,
          state: state,
          pincode: pincode,
          mobile: mobile,
          user: JSON.parse(localStorage.getItem("user"))._id,
        },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then(() => {
        alert("address succesfully created");
        navigate("/address");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      {error && !name && <span>Name is required</span>}
      <input
        type="text"
        value={flat}
        onChange={(e) => setFlat(e.target.value)}
        placeholder="Enter flat no. or name"
      />
      {error && !flat && <span>Flat is required</span>}
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Enter area"
      />
      {error && !area && <span>Area is required</span>}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      {error && !city && <span>City is required</span>}
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Enter state"
      />
      {error && !state && <span>State is required</span>}
      <input
        type="number"
        max="999999"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter pincode"
      />
      {error && !pincode && <span>pincode is required</span>}
      <input
        type="number"
        max="9999999999"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
      />
      {error && !mobile && <span>Mobile is required</span>}

      <button onClick={handleAddress}>Create Address</button>
    </div>
  );
};

export default CreateAddress;
