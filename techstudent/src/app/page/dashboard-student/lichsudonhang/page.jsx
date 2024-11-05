  "use client";
  import React, { useState, useEffect } from "react";
  import { Oder } from "../../../../service/Oder/Oder";

  export default function Khoahocdanghoc() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("");
    const [tab, setTab] = useState("today");
    const [date, setDate] = useState("");

    useEffect(() => {
      Oder().then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      });
    }, []);

    useEffect(() => {
      let newData = data.filter((item) =>
        item.trangthai.toLowerCase().includes(filter.toLowerCase())
      );

      const today = new Date();
      if (tab === "today") {
        newData = newData.filter(item => new Date(item.created_at).toDateString() === today.toDateString());
      } else if (tab === "monthly") {
        newData = newData.filter(item => {
          const date = new Date(item.created_at);
          return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        });
      } else if (tab === "yearly") {
        newData = newData.filter(item => new Date(item.created_at).getFullYear() === today.getFullYear());
      }

      if (date) {
        const selectedDate = new Date(date);
        newData = newData.filter(item => new Date(item.created_at).toDateString() === selectedDate.toDateString());
      }

      setFilteredData(newData);
    }, [filter, data, tab, date]);

    const handleTabChange = (newTab) => {
      setTab(newTab);
    };

    return (
      <div className="overflow-y-scroll col-lg-9 h-lvh">
        <div className="rts-reviewd-area-dashed table-responsive" style={{ whiteSpace: "nowrap" }}>
          <div className="calender-and-tab-btn-between">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${tab === "today" ? "active" : ""}`}
                  onClick={() => handleTabChange("today")}
                  type="button"
                >
              Hôm nay
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${tab === "monthly" ? "active" : ""}`}
                  onClick={() => handleTabChange("monthly")}
                  type="button"
                >
                 Hàng tháng
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${tab === "yearly" ? "active" : ""}`}
                  onClick={() => handleTabChange("yearly")}
                  type="button"
                >
                  Hàng năm
                </button>
              </li>
            </ul>
            <div className="date-picker-area">
              <input
                placeholder="Select your date"
                type="date"
                name="checkIn"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="calendar"
              />

            </div>
          </div>
          <div className="filter-area">
            <input
              type="text"
              placeholder="Lọc theo trạng thái"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" role="tabpanel">
              <h5 className="title">Order History</h5>
              <table className="table-reviews quiz mb--0">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}> id đặt hàng </th>
                    <th style={{ width: "35%" }}> Tên khóa học </th>
                    <th style={{ width: "20%" }}> Ngày </th>
                    <th style={{ width: "10%" }}> Giá </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="information-quiz">
                          <p className="quiz">#{item.id}</p>
                        </div>
                      </td>
                      <td>
                      <span className = "câu hỏi"> Tên khóa học trình giữ chỗ </span>
                      </td>
                      <td>
                        <span className="marks">{item.created_at}</span>
                      </td>
                      <td>
                        <span>${item.tong}</span>
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