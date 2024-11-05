"use client";
import React, { useState } from "react";
import Header from "../../../../src/app/component/header/header";
import { Register } from "../../../service/Register/register";

export default function Page() {
  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    dienthoai: '',
    matkhau: '',  
    hinh: 'https://png.pngtree.com/png-clipart/20221230/original/pngtree-blank-face-man-cartoon-character-png-image_8831926.png',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ten) newErrors.ten = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dienthoai) newErrors.dienthoai = "Phone number is required";
    if (!formData.matkhau) newErrors.matkhau = "Password is required";
    if (formData.matkhau !== formData.repassword) newErrors.repassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await Register(formData);
      console.log(response);
      if (response) {
        window.location = '/page/login';
      }
    } catch (error) {
      console.error("Failed to fetch courses: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="login-registration-wrapper">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="login-page-form-area">
                <h4 className="title">Sign Up to Your Account👋</h4>
                <form onSubmit={handleSubmit}>
                  <div className="single-input-wrapper">
                    <label htmlFor="name">Your Name*</label>
                    <input
                      id="name"
                      name="ten"
                      type="text"
                      placeholder="Enter Your Name"
                      value={formData.ten}
                      onChange={handleChange}
                      required
                    />
                    {errors.ten && <p className="error">{errors.ten}</p>}
                  </div>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="email">Email*</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="phone">Phone*</label>
                    <input
                      id="phone"
                      name="dienthoai"
                      type="text"
                      placeholder="Enter Your Phone Number"
                      value={formData.dienthoai}
                      onChange={handleChange}
                      required
                    />
                    {errors.dienthoai && <p className="error">{errors.dienthoai}</p>}
                  </div>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="password">Your Password</label>
                      <input
                        id="password"
                        name="matkhau"
                        type="password"
                        placeholder="Password"
                        value={formData.matkhau}
                        onChange={handleChange}
                        required
                      />
                      {errors.matkhau && <p className="error">{errors.matkhau}</p>}
                    </div>
                    <div className="single-input-wrapper">
                      <label htmlFor="passwords">Re Password</label>
                      <input
                        id="passwords"
                        name="repassword"
                        type="password"
                        placeholder="Re Password"
                        onChange={handleChange}
                        required
                      />
                      {errors.repassword && <p className="error">{errors.repassword}</p>}
                    </div>
                  </div>
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="type-1" />
                      <label htmlFor="type-1">
                        Accept the Terms and Privacy Policy
                      </label>
                      <br />
                    </div>
                  </div>
                  <button className="rts-btn btn-primary" type="submit">Sign Up</button>
                  <p>
                    Don t Have an account? <a href="#">Registration</a>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p mt--100">
                <img
                  src="/assets/images/banner/login-bg.png"
                  width={600}
                  height={495}
                  alt="login-form"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}