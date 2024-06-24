import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "../../Firebase";
import { createContext, useContext, useEffect, useState } from "react";
const StudentdataContext = createContext();
export const StudentgetterContext = () => {
  return useContext(StudentdataContext);
};
export const StudentgetterProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  useEffect((e) => {
    const fetchStudents = async () => {
      try {
        const docref = await getDocs(collection(db, "studentdata"));
        const studentsdata = docref.docs.map((doc) => doc.data());
        setStudents(studentsdata);
      } catch (e) {
        console.log("error", e);
      }
    }
    fetchStudents();
    // console.log(fetchStudents);
  }, []);
  async function adddata(student) {
    // Add a new document in collection
    try {
      await addDoc(collection(db, "studentdata"), student);
      setStudents([...students, student]);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <StudentdataContext.Provider value={{ adddata, students }}>
      {children}
    </StudentdataContext.Provider>
  );
};
