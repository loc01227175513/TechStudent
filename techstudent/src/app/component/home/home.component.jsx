
import React from 'react';

import { Commenthome } from "../comment/comment";
import { OutstandingCourse, CourseNew, Courseseal, Coursefree } from "../course/course.component";
import HorizontalScrollImages from "../course/Slider";
import { NextCategory } from "../category/category.component";
import {Banner } from "../banner/banner";



export default function Homecomponent() {





  return (
    <div className="mt-32">
      <Banner />
   

      {/* <div className="flex justify-center my-24">
        <div>
        </div>
        <div className="flex ">
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126647/13_jmgxo8.svg" alt=""
              className="w-36 h-36 mx-9"
            />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126637/12_tm0xts.svg" alt=""
              className="w-36 h-36 mx-9"

            />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126629/11_t1fwzm.svg" alt=""
              className="w-36 h-36 mx-9"

            />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126621/10_tkgxsm.svg" alt=""
              className="w-36 h-36 mx-9"

            />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126611/09_i4yvcq.svg" alt=""
              className="w-36 h-36 mx-9"

            />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126601/08_v0jlvy.svg" alt=""
              className="w-36 h-36 mx-9"

            />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126611/09_i4yvcq.svg" alt=""
              className="w-36 h-36 mx-9"

            />
          </div>
        </div>
      </div> */}
      <HorizontalScrollImages />

  


      <NextCategory />

      <OutstandingCourse />
      {/* course area end */}
      {/* why choose us section area start */}
      <div className="why-choose-us bg-blue bg-choose-us-one bg_image rts-section-gap shape-move">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="why-choose-us-area-image pb--50">
                <img
                  className="one"
                  src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218768/02_atsgze.jpg"
                  alt="why-choose"
                />
                <div className="border-img">
                  <img
                    className="two ml--20"
                    src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218908/03_grf0on.jpg"
                    alt="why-choose"
                  />
                </div>
                <div className="circle-animation">
                  <a
                    className="uni-circle-text uk-background-white dark:uk-background-gray-80 uk-box-shadow-large uk-visible@m"
                    href="#view_in_opensea"
                  >
                    <svg
                      className="uni-circle-text-path uk-text-secondary uni-animation-spin"
                      viewBox="0 0 100 100"
                      width={200}
                      height={200}
                    >
                      <defs>
                        <path
                          id="circle"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        ></path>
                      </defs>
                      <text fontSize="11.2">
                        <textPath xlinkHref="#circle">
                          About Univercity • About Collage •
                        </textPath>
                      </text>
                    </svg>
                    <i className="fa-regular fa-arrow-up-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pl--90 pl_md--15 mt_md--50 pl_sm--15 pt_sm--50">
              <div className="title-area-left-style">
                <div className="pre-title">
                  <i className="mr-1 bi bi-lightbulb" style={{ color: 'white' }}></i>
                  <span>Tại sao chọn chúng tôi</span>
                </div>
                <h2 className="title">
                  Techstudent Con đường dẫn đến sự xuất sắc và thành công của bạn
                </h2>
                <p className="post-title">
                  Chúng tôi đam mê giáo dục và tận tâm cung cấp các nguồn học tập chất lượng cao cho người học ở mọi hoàn cảnh.
                </p>
              </div>
              <div className="why-choose-main-wrapper-1">
                {/* single choose reason */}
                <div className="single-choose-reason-1">
                  <div className="icon">
                    <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218997/01_s9m4hw.png" alt="icon" />
                  </div>
                  <h6 className="title">Giảng viên chuyên gia</h6>
                </div>
                {/* single choose reason end */}
                {/* single choose reason */}
                <div className="single-choose-reason-1">
                  <div className="icon">
                    <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219039/02_vnmc5y.png" alt="icon" />
                  </div>
                  <h6 className="title">Interactive Learning</h6>
                </div>
                {/* single choose reason end */}
                {/* single choose reason */}
                <div className="single-choose-reason-1">
                  <div className="icon">
                    <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219054/03_gqwcdw.png" alt="icon" />
                  </div>
                  <h6 className="title">Affordable Learning</h6>
                </div>
                {/* single choose reason end */}
                {/* single choose reason */}
                <div className="single-choose-reason-1">
                  <div className="icon">
                    <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219080/04_zdj1tq.png" alt="icon" />
                  </div>
                  <h6 className="title">Career Advance</h6>
                </div>
                {/* single choose reason end */}
                {/* single choose reason */}
                <div className="single-choose-reason-1">
                  <div className="icon">
                    <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219100/05_qkz8ke.png" alt="icon" />
                  </div>
                  <h6 className="title">Course Selection</h6>
                </div>
                {/* single choose reason end */}
                {/* single choose reason */}
                <div className="single-choose-reason-1">
                  <div className="icon">
                    <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219100/05_qkz8ke.png" alt="icon" />
                  </div>
                  <h6 className="title">Support Community</h6>
                </div>
                {/* single choose reason end */}
              </div>
              <a
                href="single-course.html"
                className="rts-btn btn-primary-white with-arrow"
              >
                View All Course <i className="fa-regular fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
        <div className="shape-image">
          <div className="shape one" data-speed="0.04" data-revert="true">
            {/* <img src="assets/images/banner/15.png" alt="" /> */}
          </div>
          <div className="shape two" data-speed="0.04">
            {/* <img src="assets/images/banner/shape/banner-shape02-w.svg" alt="" /> */}
          </div>
          <div className="shape three" data-speed="0.04">
            {/* <img src="assets/images/banner/16.png" alt="" /> */}
          </div>
        </div>
      </div>
      {/* why choose us section area end */}
      {/* up coming events area start */}



      <CourseNew />




      {/* up coming events area end */}
      {/* fun facts area start */}
      <div className="fun-facts-area-1 shape-move bg_image ptb--50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="fun-facts-main-wrapper-1">
                {/* single  */}
                <div className="single-fun-facts">
                  <div className="icon">
                    {/* <img src="assets/images/fun-facts/01.svg" alt="icon" /> */}
                  </div>
                  <h5 className="title">
                    <span className="counter">65,972</span>
                  </h5>
                  <span className="enr">Students Enrolled</span>
                </div>
                {/* single end */}
                {/* single  */}
                <div className="single-fun-facts">
                  <div className="icon">
                    {/* <img src="assets/images/fun-facts/02.svg" alt="icon" /> */}
                  </div>
                  <h5 className="title">
                    <span className="counter">5,321</span>
                  </h5>
                  <span className="enr">Completed Course</span>
                </div>
                {/* single end */}
                {/* single  */}
                <div className="single-fun-facts">
                  <div className="icon">
                    {/* <img src="assets/images/fun-facts/03.svg" alt="icon" /> */}
                  </div>
                  <h5 className="title">
                    <span className="counter">44,239</span>
                  </h5>
                  <span className="enr">Students Learner</span>
                </div>
                {/* single end */}
                {/* single  */}
                <div className="single-fun-facts">
                  <div className="icon">
                    {/* <img src="assets/images/fun-facts/04.svg" alt="icon" /> */}
                  </div>
                  <h5 className="title">
                    <span className="counter">75,992</span>
                  </h5>
                  <span className="enr">Students Enrolled</span>
                </div>
                {/* single end */}
              </div>
            </div>
          </div>
        </div>
        <div className="shape-image">
          <div className="shape one" data-speed="0.04" data-revert="true">
            {/* <img src="assets/images/banner/15.png" alt="" /> */}
          </div>
          <div className="shape three" data-speed="0.04">
            {/* <img src="assets/images/banner/16.png" alt="" /> */}
          </div>
        </div>
      </div>

      <Courseseal />

      <Coursefree />




      {/* fun facts area end */}
      {/* instructor area start */}

      {/* instructor area start */}
      {/* feedback area start */}
      <div className="rts-feedback-area rts-section-gap bg-light-1 shape-move small:mb-16 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-center-style">
                <div className="pre-title">
                  <i className="mr-1 bi bi-lightbulb" style={{ color: '#32ADE6' }}></i>
                  <span>Đánh giá của sinh viên</span>
                </div>
                <h2 className="title">Phản hồi của sinh viên của chúng tôi</h2>
                <p className="post-title">
                Bạn sẽ tìm thấy một cái gì đó để khơi dậy sự tò mò của bạn và tăng cường
                </p>
              </div>
            </div>
          </div>
          <Commenthome />

        </div>
      </div>
      {/* feedback area end */}
      {/* rts blog area start */}
      {/* rts blog area end */}
      {/* cart area start */}
      <div className="cart-bar">
        <div className="cart-header">
          <h3 className="cart-heading"> Giỏ hàng của tôi (3 mặt hàng)</h3>
          <div className="close-cart">
            <i className="fal fa-times" />
          </div>
        </div>
        <div className="product-area">
          <div className="product-item">
            <div className="product-detail">
              <div className="product-thumb">
                {/* <img src="assets/images/course/cart/01.jpg" alt="product-thumb" /> */}
              </div>
              <div className="item-wrapper">
                <span className="product-name">Xây dựng bản đồ</span>
                <div className="item-wrapper">
                  <span className="product-variation">
                    <span className="color">Màu xanh lá /</span>
                    <span className="size">xl</span>
                  </span>
                </div>
                <div className="item-wrapper">
                  <span className="product-qnty">3 ×</span>
                  <span className="product-price">$198.00</span>
                </div>
              </div>
            </div>
            <div className="cart-edit">
              <div className="quantity-edit">
                <button className="button">
                  <i className="fal fa-minus minus" />
                </button>
                <input type="text" className="input" defaultValue={3} />
                <button className="button plus">
                  +<i className="fal fa-plus plus" />
                </button>
              </div>
              <div className="item-wrapper d-flex mr--5 align-items-center">
                <a href="#" className="product-edit">
                  <i className="fal fa-edit" />
                </a>
                <a href="#" className="delete-cart">
                  <i className="fal fa-times" />
                </a>
              </div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-detail">
              <div className="product-thumb">
                {/* <img src="assets/images/course/cart/02.jpg" alt="product-thumb" /> */}
              </div>
              <div className="item-wrapper">
                <span className="product-name"> Bridge product</span>
                <div className="item-wrapper">
                  <span className="product-variation">
                    <span className="color">Green /</span>
                    <span className="size">XL</span>
                  </span>
                </div>
                <div className="item-wrapper">
                  <span className="product-qnty">2 ×</span>
                  <span className="product-price">$88.00</span>
                </div>
              </div>
            </div>
            <div className="cart-edit">
              <div className="quantity-edit">
                <button className="button">
                  <i className="fal fa-minus minus" />
                </button>
                <input type="text" className="input" defaultValue={2} />
                <button className="button plus">
                  +<i className="fal fa-plus plus" />
                </button>
              </div>
              <div className="item-wrapper d-flex mr--5 align-items-center">
                <a href="#" className="product-edit">
                  <i className="fal fa-edit" />
                </a>
                <a href="#" className="delete-cart">
                  <i className="fal fa-times" />
                </a>
              </div>
            </div>
          </div>
          <div className="product-item last-child">
            <div className="product-detail">
              <div className="product-thumb">
                {/* <img src="assets/images/course/cart/03.jpg" alt="product-thumb" /> */}
              </div>
              <div className="item-wrapper">
                <span className="product-name">Labour helmet</span>
                <div className="item-wrapper">
                  <span className="product-variation">
                    <span className="color">Green /</span>
                    <span className="size">XL</span>
                  </span>
                </div>
                <div className="item-wrapper">
                  <span className="product-qnty">1 ×</span>
                  <span className="product-price">$289.00</span>
                </div>
              </div>
            </div>
            <div className="cart-edit">
              <div className="quantity-edit">
                <button className="button">
                  <i className="fal fa-minus minus" />
                </button>
                <input type="text" className="input" defaultValue={2} />
                <button className="button plus">
                  +<i className="fal fa-plus plus" />
                </button>
              </div>
              <div className="item-wrapper d-flex mr--5 align-items-center">
                <a href="#" className="product-edit">
                  <i className="fal fa-edit" />
                </a>
                <a href="#" className="delete-cart">
                  <i className="fal fa-times" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-bottom-area">
          <span className="spend-shipping">
            <i className="fal fa-truck" /> SPENT{" "}
            <span className="amount">$199.00</span> MORE FOR FREE SHIPPING
          </span>
          <span className="total-price">
            TOTAL: <span className="price">$556</span>
          </span>
          <a href="checkout.html" className="checkout-btn cart-btn">
            PROCEED TO CHECKOUT
          </a>
          <a href="cart.html" className="view-btn cart-btn">
            VIEW CART
          </a>
        </div>
      </div>
      {/* cart area edn */}

    </div>
  )
}