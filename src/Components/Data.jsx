import React, { useState } from "react";
import { DeleteIcon } from "./Icons";
import upload from "../assets/images/webp/upload.webp";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase";

const Data = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [deletedIndex, setDeletedIndex] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleDeleteImage = (index) => {
    setDeletedIndex(index);

    // Set timeout for 5 seconds
    setTimeout(async () => {
      // // If user hasn't undone, proceed with deletion
      // if (deletedIndex === index) {
      //   const updatedData = [...data];
      //   const deletedImage = updatedData[index];
      //   updatedData.splice(index, 1);
      //   setData(updatedData);

      //   if (deletedImage) {
      //     // Delete the image from Firebase Storage
      //     const storageRef = ref(storage, "images/" + deletedImage.name);
      //     try {
      //       // Delete the file from Firebase Storage
      //       await deleteObject(storageRef);
      //       console.log("Image deleted from Firebase Storage successfully!");
      //     } catch (error) {
      //       console.error("Error deleting image from Firebase Storage:", error);
      //     }
      //   }
      // }
      console.log("hello");
    }, 5000);
  };

  const handleUndoDelete = () => {
    setDeletedIndex(null);
  };

  const handleUploadImage = async () => {
    if (selectedImage) {
      setData((prevData) => [...prevData, selectedImage]);
      setSelectedImage(null);
      const storageRef = ref(storage, "images/" + selectedImage.name);
      try {
        await uploadBytes(storageRef, selectedImage);
        console.log("Image uploaded to Firebase Storage successfully!");
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }
  };
  return (
    <div className="m-24">
      <div className="border border-red-950 p-5 h-72">
        <h1 className="text-5xl font-bold text-center text-red-500">
          Upload Images In Firebase
        </h1>
        <div className="flex justify-center items-center">
          <div className="border border-green-900 mt-5 p-5">
            {selectedImage ? (
              <div className="relative w-[120px] h-[120px] border flex justify-center items-center rounded-lg">
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                <div
                  onClick={handleDeleteImage}
                  className="absolute top-1 right-1 cursor-pointer bg-[#B63336] rounded-full p-1"
                >
                  <DeleteIcon />
                </div>
                <div
                  onClick={handleUploadImage}
                  className="absolute bottom-1 left-1 cursor-pointer bg-[#B63336] rounded-full p-1"
                >
                  <img className="w-4" src={upload} alt="uploadimage" />
                </div>
              </div>
            ) : (
              <div>
                <input
                  className="max-w-[300px] max-h-[200px]"
                  type="file"
                  id="mockup"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <label
                  htmlFor="mockup"
                  className="ff_inter font-normal text-base mb-0 text-[#04B92C] cursor-pointer"
                >
                  ADD IMAGE
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        {data.map((image, index) => (
          <div
            key={index}
            className="relative w-[120px] h-[120px] border flex justify-center items-center rounded-lg mt-7 "
          >
            {deletedIndex === index ? (
              <div className="text-red-500">delete image</div>
            ) : (
              <img src={URL.createObjectURL(image)} alt="Selected" />
            )}
            {deletedIndex === index && (
              <div
                onClick={() => handleUndoDelete()}
                className="absolute top-1 right-1 cursor-pointer bg-[#B63336] rounded-full p-1"
              >
                Undo
              </div>
            )}
            {deletedIndex !== index && (
              <div
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 cursor-pointer bg-[#B63336] rounded-full p-1"
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
