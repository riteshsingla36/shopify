import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./usersignup.css";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    axios
      .post("/user/signup", { name, email, password })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", JSON.stringify(data.data.auth));

        axios
          .post(
            "/cart",
            { user: data.data.user._id },
            {
              headers: {
                token: JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((data) =>
            localStorage.setItem("cart", JSON.stringify(data.data._id))
          )
          .catch();
        navigate("/");
      })
      .catch((err) => alert("Error Occured please check all the details"));
  };

  return (
    <div className="user-signup">
      <h1>Signup</h1>
      <p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        {error && !name && <span className="error">name is required</span>}
      </p>
      <p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        {error && !email && <span className="error">email is required</span>}
      </p>
      <p className="user-signup-password">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <span className="pswd-show" onClick={() => setShow(!show)}>
          {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
        {error && !password && (
          <span className="error">password is required</span>
        )}
      </p>

      <button onClick={() => handleSignup()}>Signup</button>
    </div>
  );
};

export default UserSignup;
