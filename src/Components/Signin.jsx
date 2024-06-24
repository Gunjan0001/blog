import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { app } from "../Firebase";
const auth = getAuth(app);
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signinuser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => console.log("signin-sucess"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1 className="text-center text-5xl my-4">signin page</h1>
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
      <button onClick={signinuser} className="border border-black p-2">signin</button>
    </div>
  );
};

export default Signin;
