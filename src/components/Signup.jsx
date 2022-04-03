import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("seller");
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
      .post("/seller/user/signup", { name, email, password })
      .then((data) => {
        localStorage.setItem("seller", JSON.stringify(data.data.seller));
        localStorage.setItem("token", JSON.stringify(data.data.auth));
        navigate("/");
      })
      .catch((err) => alert("pta nhi kya hua"));
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      {error && !password && <span>password is required</span>}

      <button onClick={() => handleSignup()}>Signup</button>
    </div>
  );
};

export default Signup;
