import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { app } from "../Firebase";
const auth = getAuth(app);
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) =>
      alert("success")
    );
  };
  return (
    <div>
        <h1 className="text-center text-5xl my-4">signup page</h1>
      <label>email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border mb-10 border-black p-2"
        required
        type="email"
        placeholder="enter your email"
      />{" "}
      <br></br>
      <label>password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border border-black p-2"
        required
        type="password"
        placeholder="enter your password"
      />{" "}
      <br></br>
      <button className="border border-black p-2"  onClick={createUser}>signup</button>
    </div>
  );
};

export default Signup;
