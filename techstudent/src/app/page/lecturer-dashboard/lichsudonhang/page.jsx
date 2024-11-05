"use client";
import React, { useEffect, useState } from "react";
import { GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";

export default function Khoahocdanghoc() {
  const [lecturer, setLecturer] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTab, setSelectedTab] = useState("all"); // Default to "all" for no tab filter

  useEffect(() => {
    GiangvienKhoaHocDaMua().then((res) => {
      setLecturer(res.data);
    });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Lọc dựa trên selectedDate
  const dateFilteredLecturer = lecturer?.filter((item) => {
    if (!selectedDate) return true;
    const itemDate = new Date(item.updated_at);
    return (
      itemDate.toLocaleDateString("en-US") ===
      new Date(selectedDate).toLocaleDateString("en-US")
    );
  });

  // Lọc dựa trên selectedTab
  const tabFilteredLecturer = dateFilteredLecturer?.filter((item) => {
    const itemDate = new Date(item.updated_at);

    switch (selectedTab) {
      case "day":
        return itemDate.toLocaleDateString("en-US") === new Date().toLocaleDateString("en-US");
      case "month":
        return (
          itemDate.getMonth() === new Date().getMonth() &&
          itemDate.getFullYear() === new Date().getFullYear()
        );
      case "year":
        return itemDate.getFullYear() === new Date().getFullYear();
      default:
        return true; // 'all' case or no tab selected
    }
  });

  return (
    <div className="col-lg-9 overflow-y-scroll h-lvh">
      <div
        className="rts-reviewd-area-dashed table-responsive"
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="calender-and-tab-btn-between">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "day" ? "active" : ""}`}
                id="home-tab"
                type="button"
                role="tab"
                onClick={() => handleTabChange("day")}
              >
                Hôm nay
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "month" ? "active" : ""}`}
                id="profile-tab"
                type="button"
                role="tab"
                onClick={() => handleTabChange("month")}
              >
                Hàng tháng
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "year" ? "active" : ""}`}
                id="contact-tab"
                type="button"
                role="tab"
                onClick={() => handleTabChange("year")}
              >
                Hàng năm
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "all" ? "active" : ""}`}
                type="button"
                onClick={() => handleTabChange("all")}
              >
                Tất cả
              </button>
            </li>
          </ul>
          <div className="date-picker-area">
            <input
              placeholder="Select your date"
              type="date"
              name="checkIn"
              id="datepicker"
              value={selectedDate}
              onChange={handleDateChange}
              className="calendar"
            />
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
          >
            <h5 className="title">Lịch sử đặt hàng</h5>
            <table className="table-reviews quiz mb--0">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>ID đặt hàng</th>
                  <th style={{ width: "35%" }}>Tên khóa học</th>
                  <th style={{ width: "20%" }}>Ngày</th>
                  <th style={{ width: "10%" }}>Giá</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {tabFilteredLecturer && tabFilteredLecturer.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="information-quiz">
                        <p className="quiz">#4601</p>
                      </div>
                    </td>
                    <td>
                      <span className="questions">{item.khoahocs.ten}</span>
                    </td>
                    <td>
                      <span className="marks">{new Date(item.updated_at).toLocaleDateString("en-US")}</span>
                    </td>
                    <td>
                      <span>${item.gia}</span>
                    </td>
                    <td>
                      <div className="hold-area">
                        <span className="hold">{item.trangthai}</span>
                        <span className="hold-i">
                          <i className="fa-regular fa-clipboard-list" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
