import React, { useState } from "react";
import { StudentgetterContext } from "./common/StudentdataContext";
const CurdWithContextApi = () => {
  const { adddata, students } = StudentgetterContext();
  const [showPopup, setShowPopup] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    city: "",
  });
  function handleInputChange(e) {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  }
  const handleAddStudent = (e) => {
    e.preventDefault();
    const student = {
      name: newStudent.name,
      class: newStudent.class,
      city: newStudent.city,
    };
    adddata(student);
    
    setNewStudent({ name: "", class: "", city: "" });
    setShowPopup(false);
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <table className="flex flex-col justify-center items-center">
          <thead>
            <tr className="flex gap-7 border border-black p-2">
              <th>Name</th>
              <th>class</th>
              <th>city</th>
              <th
                onClick={() => {
                  setShowPopup(true);
                }}
                className="border-white px-2 border bg-yellow-800 text-white cursor-pointer"
              >
                +Add new student
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((value, i) => {
              return (
                <tr key={i} className="flex gap-7 p-2 mt-2 border border-black">
                  <td>{value.name}</td>
                  <td>{value.class}</td>
                  <td>{value.city}</td>
                  <td>
                    <div className="flex gap-3">
                      <button className="border-white px-2 border bg-green-700 text-white">
                        edit
                      </button>
                      <button className="border-white px-2 border bg-red-800 text-white">
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showPopup ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="h-screen flex flex-col items-center justify-center ">
              <form
                onSubmit={handleAddStudent}
                className="w-[400px] border border-black rounded-xl p-8 flex flex-col justify-center items-center bg-black"
              >
                <input
                  className="border border-black mt-4 w-full rounded-lg p-3"
                  type="text"
                  placeholder="Write Your Name"
                  value={newStudent.name}
                  required
                  name="name"
                  onChange={handleInputChange}
                />
                <input
                  className="border border-black mt-4 w-full rounded-lg p-3"
                  type="text"
                  placeholder="class"
                  name="class"
                  value={newStudent.class}
                  required
                  onChange={handleInputChange}
                />
                <input
                  className="border border-black mt-4 w-full rounded-lg p-3"
                  type="text"
                  placeholder="city"
                  name="city"
                  value={newStudent.city}
                  required
                  onChange={handleInputChange}
                />
                <div className="flex justify-end gap-5">
                  <button
                    onClick={() => {
                      setShowPopup(false);
                    }}
                    className="border border-green-500 p-2 rounded-lg bg-green-500 text-white mt-5"
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="border border-red-900 p-2 rounded-lg bg-red-900 text-white mt-5"
                  >
                    +Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CurdWithContextApi;
