import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
            .get(`/cart?user=${data.data.user._id}&active=true`)
            .then((data) => {
              localStorage.setItem("cart", JSON.stringify(data.data[0]._id));
            })
            .catch((err) => alert(err.message));
          navigate("/");
        } else {
          alert("pher pta nhi kya hua");
        }
      })
      .catch((err) => alert("seller not found"));
  };
  return (
    <div className="login">
      <h1>Login</h1>
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
      {error && !password && <span>password is required</span>}
      <p onClick={() => setShow(!show)}>
        {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </p>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
