import React, { Fragment, useEffect, useState } from "react";
import {
  CrossIcon,
  DeleteIcon,
  DownArrow,
} from "../../Components/common/Icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { addDoc, collection } from "firebase/firestore";
import { useServicesContext } from "../../context/servicegetter";
import { db } from "../../firebase";
const AddService = () => {
  const investment = [
    { name: "Maintenance and Repair" },
    { name: "Maintenance" },
  ];
  const durationtime = [{ name: "1 hour" }, { name: "2 hour" }];
  const tagdata = [{ name: "tag1" }, { name: "tag2" }];
  const [cateogry, setCateogry] = useState(
    investment[0].name || "Maintenance and Repair"
  );
  const [duration, setDuration] = useState(durationtime[0].name || "1hour");
  const [isvarient, setisVarient] = useState(false);
  const [value, setValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState([]);
  const { serviceData, setServiceData } = useServicesContext();
  const [tag, setTag] = useState([]);
  const [tagData, setTagData] = useState("");
  const [formData, setFormData] = useState({
    servicetitile: "",
    regularprice: "",
    MokupImage: selectedImage,
    MokupImage2: selectedImage2,
    CoverImages: selectedImage1,
  });
  // context //
  const { addData } = useServicesContext();
  // useEffect when image is selected
  useEffect(() => {
    // Update formData when selectedImage or selectedImage1 changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      MokupImage: selectedImage,
      MokupImage2: selectedImage2,
      CoverImages: selectedImage1,
    }));
  }, [selectedImage, selectedImage2, selectedImage1]);
  const handleFileInputChange1 = (event) => {
    const newImages = [...selectedImage1, ...event.target.files];
    setSelectedImage1(newImages);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleFileInputChange2 = (event) => {
    const file = event.target.files[0];
    setSelectedImage2(file);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormData({
      MokupImage: selectedImage,
      MokupImage2: selectedImage2,
      CoverImages: selectedImage1,
    });
    // Log form data to console
    console.log("Form Data:", formData);
    // Reset form fields
    handleReset();
  }
  function handleReset() {
    setSelectedImage(null);
    setSelectedImage2(null);
    setSelectedImage1([]);
  }
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    console.log(value);

    // const selectedStudent = teamData.find((data) => data.id === value);
    // console.log(selectedStudent);
    // if (fieldName === "studentname") {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     studentname: selectedStudent ? selectedStudent.firstName : "",
    //     studentId: selectedStudent ? selectedStudent.id : "",
    //   }));
    // } else {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    // }
  };
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };
  const handleDeleteImage2 = () => {
    setSelectedImage2(null);
  };
  const handleDeleteImage1 = (index) => {
    const newImages = [...selectedImage1];
    newImages.splice(index, 1);
    setSelectedImage1(newImages);
  };
  const handleChange = (content, delta, source, editor) => {
    const deltaOps = editor.getContents().ops;
    const deltaHtml = convertDeltaToHtml(deltaOps);
    setValue(editor.getContents());
    setFormData((prevFormData) => ({
      ...prevFormData,
      detailedDescription: deltaHtml,
    }));
  };
  const convertDeltaToHtml = (deltaOps) => {
    const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
    return converter.convert();
  };
  function handelSubmit(e) {
    if (e.key === "Enter") {
      setTag([...tag, tagData]);
      setTagData("");
    }
  }
  function handelDeleteArea(index) {
    let updateAreas = [...tag];
    updateAreas.splice(index, 1);
    setTag(updateAreas);
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setFormData({
  //     MokupImage: selectedImage,
  //     MokupImage2: selectedImage2,
  //     CoverImages: selectedImage1,
  //   });
  //   // Log form data to console
  //   console.log("Form Data:", formData);
  //   // Reset form fields
  //   handleReset();
  // }
  async function handlesave(e) {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "services"), {
      // id: id,
      // parent_id: parent_id,
      service_name: formData.servicetitile,
      // description: description,

      // categories: {
      //   parent_id: selectedCategory.cat_ID,
      //   id: selectedCategory.id,
      //   name: selectedCategory.title,
      // },
      // brand: {
      //   id: selectBrand.id,
      //   name: selectBrand.name,
      //   image: selectBrand.image,
      // },
    });
    addData(docRef);
  }

  return (
    <div className="p-[30px]">
      <form onSubmit={handlesave}>
        <div class="flex items-center justify-between bg-[#F5F7FA] p-7">
          <h1 class="text-2xl font-semibold text-black">Add a Service</h1>
          <div class=" flex gap-3">
            <button class="py-[10px] px-[15px] outline-none rounded-[5px]  text-[14px] font-normal text-black  border border-[#b8b8b8]">
              Discard
            </button>
            <button class="py-[10px] px-[15px] outline-none rounded-[5px]  text-[14px] font-normal border border-[#b8b8b8] text-[#3874FF] ">
              Save draft
            </button>
            <button class=" py-[10px] px-[15px] outline-none rounded-[5px]  text-base font-normal text-white bg-[#3874ff]">
              Publish service
            </button>
          </div>
        </div>
        <div className="flex mt-[10px] w-full p-[10px] justify-between gap-3">
          <div className="min-w-[730px]">
            <div>
              <div className="flex flex-col">
                <label class="text-base" for="service-title">
                  Service Title
                </label>
                <input
                  value={formData.servicetitile}
                  onChange={(e) => handleInputChange(e, "title")}
                  class="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  w-full bg-white "
                  type="text"
                  placeholder="Service Title  "
                />
              </div>
              <div className="rounded-[10px] bg-white  mt-5">
                <p className=" font-normal text-base mb-0">Description</p>
                <div className="rich-text-editor mt-[10px] rounded-[10px]  ">
                  <ReactQuill
                    class="quill rounded-[10px]  w-full mt-[30px] p-[10px] border outline-none "
                    value={value}
                    onChange={handleChange}
                    modules={AddService.modules}
                    formats={AddService.formats}
                    placeholder="Write description here"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <p class="text-base ">Service Providers</p>
                <p class="text-base text-[#3874FF] cursor-pointer">
                  + Add Provider
                </p>
              </div>
              <div class="flex w-full mt-5 gap-5">
                <div className="w-1/2">
                  <label className="mt-5">Thumbnail</label>
                  <div className=" border border-[#00000033] h-[188px] mt-[10px] rounded-xl  p-5 cursor-pointer flex flex-col items-center justify-center">
                    {selectedImage ? (
                      <div className="relative w-[120px] h-[120px] border flex  justify-center items-center rounded-lg">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                        />
                        <div
                          onClick={handleDeleteImage}
                          className="absolute top-1 right-1 cursor-pointer bg-[#B63336] rounded-full p-1"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    ) : (
                      <div className=" flex flex-col items-center justify-center">
                        <input
                          type="file"
                          id="mockup"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileInputChange}
                        />
                        <p class="text-[14px]">
                          Drag your photo here or
                          <span class=" text-[#3874FF]">
                            browse from device
                          </span>
                        </p>
                        <label
                          htmlFor="mockup"
                          className="ff_inter  font-normal text-base mb-0 text-[#04B92C] cursor-pointer"
                        >
                          <img
                            className="w-[35px] h-[35px] mt-2"
                            src={imgAddicon}
                            alt="imgAddicon"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="mt-5">Mockup</label>
                  <div className=" border border-[#00000033] h-[188px] mt-[10px] rounded-xl  p-5 cursor-pointer flex flex-col items-center justify-center">
                    {selectedImage2 ? (
                      <div className="relative w-[120px] h-[120px] border flex  justify-center items-center rounded-lg">
                        <img
                          src={URL.createObjectURL(selectedImage2)}
                          alt="Selected"
                        />
                        <div
                          onClick={handleDeleteImage2}
                          className="absolute top-1 right-1 cursor-pointer bg-[#B63336] rounded-full p-1"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    ) : (
                      <div className=" flex flex-col items-center justify-center">
                        <input
                          type="file"
                          id="mockup2"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileInputChange2}
                        />
                        <p class="text-[14px]">
                          Drag your photo here or
                          <span class=" text-[#3874FF]">
                            browse from device
                          </span>
                        </p>
                        <label
                          htmlFor="mockup2"
                          className="ff_inter  font-normal text-base mb-0 text-[#04B92C] cursor-pointer"
                        >
                          <img
                            className="w-[35px] h-[35px] mt-2"
                            src={imgAddicon}
                            alt="imgAddicon"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-[400px]">
            <div className="border border-[#00000033] p-[10px] rounded-[5px]">
              <div>
                <h2 className="mb-0">Availability</h2>
                <div className="flex items-center w-full mt-[15px]">
                  <div className="w-1/2 flex items-center gap-4">
                    <input
                      onChange={() => setisVarient(true)}
                      className="accent-black w-6 h-6"
                      type="radio"
                      id="varient_yes"
                      checked={isvarient === true}
                    />
                    <label for="varient_yes">Yes</label>
                  </div>
                  <div className="w-1/2 flex items-center gap-4">
                    <input
                      onChange={() => setisVarient(false)}
                      className=" accent-black w-6 h-6"
                      type="radio"
                      id="varient_no"
                      checked={isvarient === false}
                    />
                    <label for="varient_no">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-[#00000033] p-[10px] rounded-[5px] mt-4">
              <label>Adjustments</label>
              <div className="w-full relative mt-[15px]">
                <label className="text-[14px]">Category</label>
                <br />
                <Listbox value={cateogry} onChange={setCateogry}>
                  <div className="relative">
                    <Listbox.Button className="relative rounded-[10px]  p-2 outline-none max-w-[380px] w-full bg-[#fff] border border-gray-300  mt-2 cursor-pointer">
                      <span className="block truncate text-start">
                        {cateogry}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <DownArrow
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="z-50 absolute mt-1 max-h-60 max-w-[380px] w-full overflow-auto rounded-md border border-black border-opacity-30 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {investment.map((person, Id) => (
                          <Listbox.Option
                            key={Id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "" : "text-gray-900"
                              }`
                            }
                            value={person.name}
                          >
                            {({ selected }) => (
                              <>
                                <span className="block truncate font-normal text-sm">
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="w-full relative mt-[15px]">
                <label className="text-[14px]">One Time Service Duration</label>
                <br />
                <Listbox value={duration} onChange={setDuration}>
                  <div className="relative">
                    <Listbox.Button className="relative rounded-[10px]  p-2 outline-none max-w-[380px] w-full bg-[#fff] border border-gray-300  mt-2 cursor-pointer">
                      <span className="block truncate text-start">
                        {duration}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <DownArrow
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className=" z-50 absolute mt-1 max-h-60 max-w-[380px] w-full overflow-auto rounded-md border border-black border-opacity-30 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {durationtime.map((person, Id) => (
                          <Listbox.Option
                            key={Id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "" : "text-gray-900"
                              }`
                            }
                            value={person.name}
                          >
                            {({ selected }) => (
                              <>
                                <span className="block truncate font-normal text-sm">
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="flex flex-col pt-3 mt-1 ">
                <label htmlFor="">Tag</label>
                <input
                  onKeyPress={(e) => {
                    handelSubmit(e);
                  }}
                  onChange={(e) => setTagData(e.target.value)}
                  className=" font-normal text-black rounded-[10px]  p-2   outline-none max-w-[380px] w-full bg-[#fff] border border-gray-300  mt-2 cursor-pointer"
                  type="text"
                  value={tagData}
                  placeholder="Enter Tag"
                />
              </div>
              <div className="flex items-center flex-wrap gap-2 mt-2 pt-1 ">
                {tag.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1 py-[5px] px-[10px] rounded-[30px] border border-solid border-black"
                    >
                      <p className="text-xxs font-normal m-0">{items}</p>
                      <span
                        onClick={() => handelDeleteArea(index)}
                        className="cursor-pointer"
                      >
                        <CrossIcon />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border border-[#00000033] p-[10px] rounded-[5px] mt-4">
              <p class="text-base ">Pricing</p>
              <div className="mt-4">
                <label class="text-base " for="service-title">
                  Regular Price
                </label>
                <input
                  // value={regularprice}
                  // onChange={(e) => handleInputChange(e, "regularprice")}
                  class="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-full bg-white "
                  type="text"
                  placeholder="₹ 0.00"
                />
                <div className="flex justify-between mt-4 items-center">
                  <p>Included in Subscription</p>
                  <label class="check1  black mb-0 mt-2">
                    <input type="checkbox" className="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="border border-[#00000033] p-[10px] rounded-[5px] mt-4">
              <p class="text-base ">Images and Videos</p>
              <div className="flex items-center mt-[15px] gap-2">
                <div className="rounded-[10px] bg-white flex gap-2">
                  {selectedImage1.map((image, index) => (
                    <div
                      key={index}
                      className=" relative w-[100px] h-[100px]  border flex  justify-center items-center rounded-lg"
                    >
                      <img src={URL.createObjectURL(image)} alt="Selected" />
                      <button
                        onClick={() => handleDeleteImage1(index)}
                        className="absolute top-1 right-1 cursor-pointer bg-[#B63336] rounded-full p-1"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                  <div className=" flex flex-col justify-center items-center w-[100px] h-[100px] p-3 border-dashed border border-[#999999] rounded-[10px] cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      id="collage"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange1}
                    />
                    <label
                      htmlFor="collage"
                      className="ff_inter  font-normal text-base mb-0 text-[#04B92C] cursor-pointer"
                    >
                      <img
                        className="w-[35px] h-[35px] "
                        src={imgAddicon}
                        alt="imgAddicon"
                      />
                    </label>
                    <p class="text-[6px] text-center mt-2">
                      Drag your photo <br></br> here or
                      <span class=" text-[#3874FF]">
                        browse<br></br> from device
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
AddService.modules = {
  toolbar: [
    // [{ header: "1" }, { header: "2" }, { font: [] }],
    // [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

AddService.formats = [
  // "header",
  // "font",
  // "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
export default AddService;
