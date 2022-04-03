import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getsellerDetails(id);
  }, [id]);

  const getsellerDetails = (id) => {
    axios
      .get(`/seller/user/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setPassword(data.data.password);
      });
  };

  const handleupdateprofile = () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    axios
      .patch(
        `/seller/user/edit-profile/${id}`,
        { name, email, password },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then(() => {
        alert("updated successfully");
        getsellerDetails(id);
      });
  };

  return (
    <div className="edit-profile">
      <h1>EditProfile</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      {error && !name && <span>name is required</span>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      {error && !email && <span>email is required</span>}
      <input
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <span onClick={() => setShow(!show)}>
        {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </span>
      {error && !password && <span>password is required</span>}

      <button onClick={() => handleupdateprofile()}>Update Profile</button>
    </div>
  );
};

export default EditProfile;
