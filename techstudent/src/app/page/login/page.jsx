"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../../../src/app/component/header/header";
import Image from "next/image";
const imagePath = "/assets/images/banner/login-bg.png";
export default function Login() {
  const initialValues = { email: "", password: "", rememberMe: false };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("vui lòng nhập đúng địa chỉ email")
      .required("email k đc để trống"),
    password: Yup.string()
      .min(8, "mật khẩu phải từ 8 kí từ trở lên")
      .required("mật khẩu k đc để trống"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        localStorage.setItem("data", JSON.stringify(result.data));
        window.location = "/";
      } else {
        const error = await response.json();
        console.error("Login failed:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
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
                <h4 className="title">Login to Your Account👋</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="single-input-wrapper">
                        <label htmlFor="email">Your Email</label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter Your Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="single-input-wrapper">
                        <label htmlFor="password">Your Password</label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="single-checkbox-filter">
                        <div className="check-box">
                          <Field
                            type="checkbox"
                            id="type-1"
                            name="rememberMe"
                          />
                          <label htmlFor="type-1">Remember Me</label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="rts-btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Login
                      </button>
                      <div className="google-apple-wrapper">
                        <div className="google">
                          {/* <img src="assets/images/contact/06.png" alt="contact" /> */}
                        </div>
                        <div className="google">
                          {/* <img src="assets/images/contact/07.png" alt="contact" /> */}
                        </div>
                      </div>
                      <p>
                        Don&apos;t Have an account?{" "}
                        <a href="/page/register">Registration</a>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p mt--100">
                <Image
                  src={imagePath}
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
