import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./userlogin.css";

const UserLogin = () => {
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

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    }
    axios
      .post("/user/login", { email, password })
      .then((data) => {
        if (data.data.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          localStorage.setItem("token", JSON.stringify(data.data.auth));
          axios
            .get(`/cart?user=${data.data.user._id}&active=true`, {
              headers: {
                token: JSON.parse(localStorage.getItem("token")),
              },
            })
            .then((data) => {
              localStorage.setItem("cart", JSON.stringify(data.data[0]._id));
            })
            .catch((err) => alert(err.message));
          navigate("/");
        } else {
          alert("Email or password is incorrect");
        }
      })
      .catch((err) => alert("user not found"));
  };
  return (
    <div className="user-login">
      <h1>Login</h1>
      <p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        {error && !email && <span className="error">email is required</span>}
      </p>

      <p className="user-login-password">
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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
