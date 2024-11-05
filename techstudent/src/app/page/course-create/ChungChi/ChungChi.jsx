"use client";
import React from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";


const Landscape = ({ chungchi, onSelect }) => {
  if (!Array.isArray(chungchi)) {
    return <></>;
  }

  const handleSelect = (id) => {
    onSelect(id);
    toast.success("Landscape selected!");
  };

  return (
    <>
      <div className="tab-content certificates-checkbox-tabs" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="homes"
          role="tabpanel"
          aria-labelledby="home-tabs"
        >
          <div className="row g-5 mt-4">
            {chungchi
              .filter((item) => item.loai === "landscape")
              .map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
                  <div className="rts-image-check-box">
                    <input
                      type="radio"
                      id={`number1-${index}`}
                      name="radio-group"
                      defaultValue="number1"
                      onChange={() => handleSelect(item.id)}
                      className="hidden"
                    />
                    <label htmlFor={`number1-${index}`} className="cursor-pointer">
                      <Image
                        src={item.giaychungnhan}
                        alt="Certificate Image"
                        width={140}
                        height={280}
                        className="rounded-lg border-2 border-gray-300 hover:border-red-600 hover:opacity-75 transition duration-300"
                      />
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const Portrait = ({ chungchi, onSelect }) => {
  if (!Array.isArray(chungchi)) {
    return <></>;
  }

  const handleSelect = (id) => {
    onSelect(id);
    toast.success("Portrait selected!");
  };

  return (
    <div className="tab-content certificates-checkbox-tabs" id="myTabContent">
      <div
        className="tab-pane fade show active"
        id="homes"
        role="tabpanel"
        aria-labelledby="home-tabs"
      >
        <div className="row g-5 mt-4">
          {chungchi
            .filter((item) => item.loai === "portrait")
            .map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
                <div className="rts-image-check-box">
                  <input
                    type="radio"
                    id={`number1-${index}`}
                    name="radio-group"
                    defaultValue="number1"
                    onChange={() => handleSelect(item.id)}
                    className="hidden"
                  />
                  <label htmlFor={`number1-${index}`} className="cursor-pointer">
                    <Image
                      src={item.giaychungnhan}
                      alt="Certificate Image"
                      width={140}
                      height={280}
                      className="rounded-lg border-2 border-gray-300 hover:border-red-600 hover:opacity-75 transition duration-300"
                    />
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export { Landscape, Portrait };