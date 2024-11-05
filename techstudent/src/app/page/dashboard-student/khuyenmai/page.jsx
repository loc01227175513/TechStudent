"use client";
import React, { useState, useEffect } from 'react';
import { showAllNguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';


export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
        showAllNguoiDungMaGiamGia()
        .then((response) => {
            setVouchers(response);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            alert("Failed to fetch vouchers.");
        });
    };

    fetchVouchers();
  }, []);

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="exrolled-course-wrapper-dashed">
        <div className="voucher-page container">
          <h1>Kho Voucher</h1>
          <div className="voucher-list row justify-content-end">
            {vouchers.map(voucher => (
              <div key={voucher.id} className="voucher-card col-md-4" style={{ backgroundColor: '#fff', border: '2px solid #000', padding: '20px', margin: '10px', borderRadius: '10px' }}>
                <h2>{voucher.magiamgia.maso}</h2>
                <p>Giảm giá: {voucher.magiamgia.giamgia}%</p>
                <p>Giới hạn sử dụng: {voucher.dasudunghientai}</p>
                <p>Cách sử dụng hiện tại: {voucher.magiamgia.sudunghientai}</p>
                <p>Trạng thái: {voucher.magiamgia.trangthai}</p>
                <p>Ngày bắt đầu: {voucher.magiamgia.ngaybatdau}</p>
                <p>Ngày hết hạn: {voucher.magiamgia.ngayketthuc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}