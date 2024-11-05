import React from "react";
import './searchcourse.css'
import Header from "../../component/header/header";


export default function Coursesearch() {
    return(
        <div>
                    {/* bộ lọc ở mobile */}
                    {/* <div className="absolute top-0 w-full h-lvh">
                            <div className="trong">

                            </div>
                            <div className="filter">

                            </div>
                        </div> */}

        {/* hết bộ lọc mobile */}
            
            <Header/>
            <>

  {/* bread crumb area end */}
  {/* course area start */}
  <div className="rts-course-default-area rts-section-gap mt-32 relative">




    <div className="container">
      <div className="row g-5">
        <div className="col-lg-3">
          {/* course-filter-area start */}
        <div className="flex items-center gap-5 lg-990:hidden">
            <div>
                <input type="text" placeholder="tìm kiếm" className="border rounded-full"/>
            </div>
            <div>
            <i class="bi bi-filter-square">bộ lọc</i>
            </div>
        </div>




          <div className="hidden lg-990:block rts-course-filter-area ">
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Search</h6>
              <div className="search-filter filter-body">
                <div className="input-wrapper">
                  <input type="text" placeholder="Search Course..." />
                  <i className="fa-light fa-magnifying-glass" />
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Type</h6>
              <div className="checkbox-filter filter-body">
                <div className="checkbox-wrapper">
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="type-1" />
                      <label htmlFor="type-1">Course</label>
                      <br />
                    </div>
                    <span className="number">(20,000)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="type-2" />
                      <label htmlFor="type-2">Bundle</label>
                      <br />
                    </div>
                    <span className="number">(20,000)</span>
                  </div>
                  {/* single check box end */}
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Category</h6>
              <div className="checkbox-filter filter-body">
                <div className="checkbox-wrapper">
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-1" />
                      <label htmlFor="category-1">Web Development</label>
                      <br />
                    </div>
                    <span className="number">(130)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-2" />
                      <label htmlFor="category-2">Film &amp; Video</label>
                      <br />
                    </div>
                    <span className="number">(85)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-3" />
                      <label htmlFor="category-3">Illustration</label>
                      <br />
                    </div>
                    <span className="number">(210)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-4" />
                      <label htmlFor="category-4">Music &amp; Art</label>
                      <br />
                    </div>
                    <span className="number">(45)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-5" />
                      <label htmlFor="category-5">Photography</label>
                      <br />
                    </div>
                    <span className="number">(35)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-6" />
                      <label htmlFor="category-6">
                        Business &amp; Marketing
                      </label>
                      <br />
                    </div>
                    <span className="number">(66)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-7" />
                      <label htmlFor="category-7">Design &amp; UI/UX</label>
                      <br />
                    </div>
                    <span className="number">(95)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="category-8" />
                      <label htmlFor="category-8">Web Design</label>
                      <br />
                    </div>
                    <span className="number">(150)</span>
                  </div>
                  {/* single check box end */}
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Level</h6>
              <div className="checkbox-filter filter-body">
                <div className="checkbox-wrapper">
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="lavel-1" />
                      <label htmlFor="lavel-1">All Levels</label>
                      <br />
                    </div>
                    <span className="number">(130)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="lavel-2" />
                      <label htmlFor="lavel-2">Beginner</label>
                      <br />
                    </div>
                    <span className="number">(85)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="lavel-3" />
                      <label htmlFor="lavel-3">Intermediate</label>
                      <br />
                    </div>
                    <span className="number">(210)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="lavel-4" />
                      <label htmlFor="lavel-4">Expert</label>
                      <br />
                    </div>
                    <span className="number">(45)</span>
                  </div>
                  {/* single check box end */}
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Author</h6>
              <div className="checkbox-filter filter-body">
                <div className="checkbox-wrapper">
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="author-1" />
                      <label htmlFor="author-1">Admin</label>
                      <br />
                    </div>
                    <span className="number">(130)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="author-2" />
                      <label htmlFor="author-2">Sean Kaye</label>
                      <br />
                    </div>
                    <span className="number">(85)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="author-3" />
                      <label htmlFor="author-3">David Travis</label>
                      <br />
                    </div>
                    <span className="number">(210)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="author-4" />
                      <label htmlFor="author-4">Dr. Angela Yu</label>
                      <br />
                    </div>
                    <span className="number">(45)</span>
                  </div>
                  {/* single check box end */}
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Tage</h6>
              <div className="checkbox-filter filter-body">
                <div className="checkbox-wrapper">
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="Tage-1" />
                      <label htmlFor="Tage-1">Course</label>
                      <br />
                    </div>
                    <span className="number">(10)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="Tage-2" />
                      <label htmlFor="Tage-2">Education</label>
                      <br />
                    </div>
                    <span className="number">(85)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="Tage-3" />
                      <label htmlFor="Tage-3">LMS</label>
                      <br />
                    </div>
                    <span className="number">(21)</span>
                  </div>
                  {/* single check box end */}
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            {/* single filter wized */}
            <div className="single-filter-left-wrapper">
              <h6 className="title">Price</h6>
              <div className="checkbox-filter filter-body last">
                <div className="checkbox-wrapper">
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="price-1" />
                      <label htmlFor="price-1">Free</label>
                      <br />
                    </div>
                    <span className="number">(6)</span>
                  </div>
                  {/* single check box end */}
                  {/* single check box */}
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="price-2" />
                      <label htmlFor="price-2">Paid</label>
                      <br />
                    </div>
                    <span className="number">(80)</span>
                  </div>
                  {/* single check box end */}
                </div>
              </div>
            </div>
            {/* single filter wized end */}
            <a href="#" className="rts-btn btn-border">
              <i className="fa-regular fa-x" /> Clear All Filters
            </a>
          </div>





          {/* course-filter-area end */}
        </div>
        <div className="col-lg-9">
          {/* filter top-area  */}
          <div className="filter-small-top-full">
            <div className="left-filter">
              <span>Short By</span>
              <select className="nice-select" name="price">
                <option>All Category</option>
                <option value="asc">Design</option>
                <option value="desc">Development</option>
                <option value="pop">Popularity</option>
                <option value="low">Price</option>
                <option value="high">Stars</option>
              </select>
            </div>
            <div className="right-filter">
              <span>Showing 1-9 of 19 results</span>
            </div>
          </div>
          {/* filter top-area end */}
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row g-5 mt--10">
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/01.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Web Development</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>25 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>54 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        The Complete Web Developer in 2023: Zero to Mastery
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/02.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Marketing</span>
                      </div>
                      <div className="single-tag">
                        <span>Finance</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>22 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>60 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        How to Write the Ultimate 1 Page Strategic Business Plan
                      </h5>
                    </a>
                    <p className="teacher">William U. Peña, MBA</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/03.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Web Development</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>23 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>40 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        100 Days Of Code - 2023 Web Development Bootcamp
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/04.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Design</span>
                      </div>
                      <div className="single-tag">
                        <span>UI/UX</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>19 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>14 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        User Experience The Ultimate Guide to Usability and UX
                      </h5>
                    </a>
                    <p className="teacher">David Travis</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/05.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Music</span>
                      </div>
                      <div className="single-tag">
                        <span>Art</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>25 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>54 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        Complete Guitar Lessons System Beginner to Advanced
                      </h5>
                    </a>
                    <p className="teacher">Erich Andreas</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/06.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Web Development</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>25 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>54 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        How to Market Yourself as Coach or Consultant Market
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/07.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Business</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>25 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>54 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        How to Run truly Productive in Meetings – and add value
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$39.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/08.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Dance</span>
                      </div>
                      <div className="single-tag">
                        <span>Meditation</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>25 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>54 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        Pole Dancing Video Course with Noelle Wood
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="price">$59.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/01.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Web Development</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>25 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>54 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        The Complete Web Developer in 2023: Zero to Mastery
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/02.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Marketing</span>
                      </div>
                      <div className="single-tag">
                        <span>Finance</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>22 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>60 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        How to Write the Ultimate 1 Page Strategic Business Plan
                      </h5>
                    </a>
                    <p className="teacher">William U. Peña, MBA</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/03.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Web Development</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>23 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>40 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        100 Days Of Code - 2023 Web Development Bootcamp
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/05.jpg" alt="course" />
                    </a>
                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                    >
                      <i className="fa-sharp fa-light fa-bookmark" />
                    </div>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>Web Development</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen" />
                        <span>23 Lessons</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-user-group" />
                        <span>40 Students</span>
                      </div>
                    </div>
                    <a href="single-course.html">
                      <h5 className="title">
                        100 Days Of Code - 2023 Web Development Bootcamp
                      </h5>
                    </a>
                    <p className="teacher">Dr. Angela Yu</p>
                    <div className="rating-and-price">
                      <div className="rating-area">
                        <span>4.5</span>
                        <div className="stars">
                          <ul>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-sharp fa-regular fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-area">
                        <div className="not price">$79.99</div>
                        <div className="price">$79.99</div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
              </div>
              <div className="row mt--30">
                <div className="col-lg-12">
                  {/* rts-pagination-area */}
                  <div className="rts-pagination-area-2">
                    <ul>
                      <li>
                        <i className="fa-solid fa-chevron-left" />
                      </li>
                      <li className="active">1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>
                        <i className="fa-solid fa-chevron-right" />
                      </li>
                    </ul>
                  </div>
                  {/* rts-pagination-area end */}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="row g-5 mt--30">
                <div className="col-lg-12">
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/11.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/12.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/13.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/14.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/15.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/16.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/17.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                  {/* rts single course */}
                  <div className="rts-single-course course-list">
                    <a href="single-course.html" className="thumbnail">
                      <img src="assets/images/course/18.jpg" alt="course" />
                    </a>
                    <div className="information-inner">
                      <div className="tags-area-wrapper">
                        <div className="single-tag">
                          <span>Web Development</span>
                        </div>
                      </div>
                      <div className="lesson-studente">
                        <div className="lesson">
                          <i className="fa-light fa-calendar-lines-pen" />
                          <span>25 Lessons</span>
                        </div>
                        <div className="lesson">
                          <i className="fa-light fa-user-group" />
                          <span>54 Students</span>
                        </div>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">
                          The Complete Web Developer in 2023: Zero to Mastery
                        </h5>
                      </a>
                      <p className="disc">
                        Discover a world of knowledge and learning opportunities
                      </p>
                      <p className="teacher">Dr. Angela Yu</p>
                      <div className="rating-and-price">
                        <div className="rating-area">
                          <span>4.5</span>
                          <div className="stars">
                            <ul>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-solid fa-star" />
                              </li>
                              <li>
                                <i className="fa-sharp fa-regular fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="price-area">
                          <div className="not price">$79.99</div>
                          <div className="price">$79.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* rts single course end */}
                </div>
              </div>
              <div className="row mt--10">
                <div className="col-lg-12">
                  {/* rts-pagination-area */}
                  <div className="rts-pagination-area-2">
                    <ul>
                      <li>
                        <i className="fa-solid fa-chevron-left" />
                      </li>
                      <li className="active">1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>
                        <i className="fa-solid fa-chevron-right" />
                      </li>
                    </ul>
                  </div>
                  {/* rts-pagination-area end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* course area end */}
  {/* Modal */}
  <div
    className="modal login-pupup-modal fade"
    id="exampleModal-login"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Hi, Welcome back!
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <form action="#" className="login-form">
            <input
              type="text"
              placeholder="Username of Email Address"
              required=""
            />
            <input type="password" placeholder="Password" required="" />
            <div className="d-flex mb--20 align-items-center">
              <input type="checkbox" id="examplecheck-modal" />
              <label htmlFor="examplecheck-modal">
                I agree to the terms of use and privacy policy.
              </label>
            </div>
            <button type="submit" className="rts-btn btn-primary">
              Sign In
            </button>
            <p className="dont-acc mt--20">
              Dont Have an Account? <a href="registration.html">Sign-up</a>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</>

        </div>
    )
}