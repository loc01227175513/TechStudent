import React from "react";

export default function Footercomponent() {
  return (
      
      <footer className="bg-light-1 ">
        <div className="footer-callto-action-area">
          <div className="container">
            {/* Call to Action Section */}
            <div className="row">
              <div className="col-12">
                <div className="call-to-sction bg_image shape-move">
                  <h2 className="title">
                    Giấy chứng nhận kỹ năng từ <br /> TechStudent
                  </h2>
                  <a href="course-one.html" className="rts-btn btn-primary-white with-arrow">
                    Xem tất cả các khóa học <i className="fa-regular fa-arrow-right" />
                  </a>
                  <div className="cta-image">
                    {/* <img src="assets/images/cta/women.png" alt="" /> */}
                  </div>
                  <div className="shape-image">
                    <div className="shape one" data-speed="0.04">
                      {/* <img src="assets/images/cta/03.svg" alt="" /> */}
                    </div>
                    <div className="shape two" data-speed="0.04">
                      {/* <img src="assets/images/cta/04.svg" alt="" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Links */}
          <div className="container">
            <div className="row ptb--100">
              <div className="col-12">
                <div className="footer-one-main-wrapper">
                  {/* Logo and Description */}
                  <div className="footer-singl-wized left-logo mb-4">
                    <div className="head">
                      <a href="#">
                        <img
                          // src="assets/images/logo/logo-1.svg"
                          alt="logo"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <div className="body">
                      <p className="dsic">
                        Chúng tôi là giáo dục đam mê dành riêng để cung cấp
                        Tài nguyên chất lượng cao Người học tất cả các nền tảng.
                      </p>
                      <ul className="wrapper-list">
                        <li>
                          <i className="fa-regular fa-location-dot" />
                          Công viên Yarra, Melbourne, Úc
                        </li>
                        <li>
                          <i className="fa-regular fa-phone" />
                          <a href="tel:+4733378901">+(61)485826710</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Quick Links */}
                  <div className="footer-singl-wized mb-4">
                    <div className="head">
                      <h6 className="title">Liên kết nhanh</h6>
                    </div>
                    <div className="body">
                      <ul className="menu">
                        <li>
                          <a href="course-two.html">Các khóa học mới nhất</a>
                        </li>
                        <li>
                          <a href="about.html">Nhiệm vụ &amp; Tầm nhìn</a>
                        </li>
                        <li>
                          <a href="become-instructor.html">Tham gia một nghề nghiệp</a>
                        </li>
                        <li>
                          <a href="zoom-meeting.html">Cuộc họp phóng to</a>
                        </li>
                        <li>
                          <a href="pricing.html">Kế hoạch định giá</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Explore */}
                  <div className="footer-singl-wized mb-4">
                    <div className="head">
                      <h6 className="title">Khám phá</h6>
                    </div>
                    <div className="body">
                      <ul className="menu">
                        <li>
                          <a href="course-one.html">Khóa học một</a>
                        </li>
                        <li>
                          <a href="course-two.html">Khóa học hai</a>
                        </li>
                        <li>
                          <a href="create-course.html">Tạo khóa học</a>
                        </li>
                        <li>
                          <a href="lesson-details.html">Chi tiết bài học</a>
                        </li>
                        <li>
                          <a href="instructor.html">Instructor</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Newsletter */}
                  <div className="footer-singl-wized input-area">
                    <div className="head">
                      <h6 className="title">Bản tin</h6>
                    </div>
                    <div className="body">
                      <p className="disc">
                        Đăng ký bản tin của chúng tôi Nhận cập nhật khóa học mới của chúng tôi
                      </p>
                      <form action="#">
                        <div className="input-area-fill mb-3">
                          <input type="email" className="form-control" placeholder="Enter Your Email" />
                          <button type="submit" className="btn btn-primary mt-2">Đăng ký</button>
                        </div>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" htmlFor="exampleCheck1">
                            Tôi đồng ý với các điều khoản sử dụng và chính sách quyền riêng tư.
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="copyright-area-one-border">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="copyright-area-one text-center">
                    <p>Bản quyền © 2024 Tất cả các quyền được bảo lưu bởi StudentHub</p>
                    <div className="social-copyright">
                      <ul className="d-flex justify-content-center">
                        <li className="mx-2">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </a>
                        </li>
                        <li className="mx-2">
                          <a href="#">
                            <i className="fa-brands fa-instagram" />
                          </a>
                        </li>
                        <li className="mx-2">
                          <a href="#">
                            <i className="fa-brands fa-linkedin" />
                          </a>
                        </li>
                        <li className="mx-2">
                          <a href="#">
                            <i className="fa-brands fa-pinterest" />
                          </a>
                        </li>
                        <li className="mx-2">
                          <a href="#">
                            <i className="fa-brands fa-youtube" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

  );
}