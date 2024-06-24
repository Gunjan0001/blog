import logo from "./logo.svg";
import "./App.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./Firebase";
import FireBAseStoreLearn from "./Components/FireBAseStoreLearn";
import Data from "./Components/Data";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import CurdWithContextApi from "./Components/CurdWithContextApi";
const auth = getAuth(app);
function App() {
  const signupuser = () => {
    createUserWithEmailAndPassword(auth, "gunjan@gmail.com", "gunjan").then(
      (value) => console.log(value)
    );
  };
  return (
    <div className="flex items-center justify-center flex-col gap-4 ">
      {/* <p>firebase authentication</p> */}
      {/* <button className="border border-black p-2" onClick={signupuser}>create user</button> */}
      {/* <Signup /> */}
      {/* <Signin /> */}
      {/* <FireBAseStoreLearn /> */}
      {/* <Data /> */}
      <CurdWithContextApi />
    </div>
  );
}

export default App;
