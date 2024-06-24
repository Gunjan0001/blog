import React, { useState, useEffect } from "react";
import db from "../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";

const FireBAseStoreLearn = () => {
  const [AppProjects, setAppProjects] = useState([]);
  // get.............................................................................
  async function fetchAppProjects() {
    try {
      const projectsRef = await getDocs(collection(db, "home"));
      console.log("get all projects ", projectsRef.docs[0].data());

      const AppProjectsList = projectsRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppProjects(AppProjectsList);
      console.log("App fetchged");
    } catch (error) {
      console.log("Error in fetchApp Projects ", error);
    }
  }
  useEffect(() => {
    fetchAppProjects();
  }, []);

  const [Names, setname] = useState("");
  const [classs, setclassss] = useState("");
  const [idd, setidd] = useState("");
  // update.....................................................................................
  async function handleupdate(id) {
    console.log("eorkin ");
    console.log("id ", id);
    try {
      let data = {
        des: "updated",
        title: "yes i updated the data",
        check: "checked",
      };

      await updateDoc(doc(db, "home", id), data);
      alert("DAta udpated ");
    } catch (error) {
      console.log("eror in updating data", error);
    }
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      // add data to the database
      let data = {
        Name: Names,
        class: classs,
      };
      await addDoc(collection(db, "Home"), data);
      alert("DAta updateing sucestul ");
    } catch (error) {
      console.log("error in upfsyr yhr fsys ", error);
    }
  }
  // delete.........................................................................................
  async function handledelete(id) {
    await deleteDoc(doc(db, "home", id));
    setAppProjects((prev) => {
      return prev.filter((project) => project.id !== id);
    });
    alert(" Data deleted");
  }

  return (
    <>
      <div>
        {AppProjects.map((item, i) => (
          <div key={i}>
            <h1>{item.title}</h1>
            <p>{item.des}</p>
            <button
              onClick={() => {
                setidd(item.id);
                handleupdate(idd);
              }}
            >
              {item.id}
            </button>
            <button onClick={() => handledelete(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handlesubmit} action="">
          <label htmlFor="name">name</label>
          <input
            value={Names}
            onChange={(e) => setname(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="name">class</label>
          <input
            value={classs}
            onChange={(e) => setclassss(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default FireBAseStoreLearn;
