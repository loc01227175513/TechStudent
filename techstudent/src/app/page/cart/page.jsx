"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../component/header/header';
import { TatCaKhuyenMaiKhoaHoc, showAllNguoiDungMaGiamGia } from '../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [KhuyenMai, setKhuyenMai] = useState([]);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    TatCaKhuyenMaiKhoaHoc()
      .then((response) => {
        setKhuyenMai(response);
      })
      .catch((error) => {
        console.error('Failed to fetch MaGiamGia data:', error);
      });
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('data');

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);

        axios.post('http://127.0.0.1:8000/api/showgiohang', { id_nguoidung: parsedData.id })
          .then(response => {
            setCartItems(response.data.data);
          })
          .catch(() => {
            // Do nothing
          });
      } catch {
        // Do nothing
      }
    }
  }, []);

  useEffect(() => {
    let beforeDiscount = 0;
    let discount = 0;

    cartItems.forEach(item => {
      item.khoahocs.forEach(khoahoc => {
        beforeDiscount += khoahoc.giamgia;
        const coupon = appliedCoupons.find(c => c.id_khoahoc === khoahoc.id);
        if (coupon) {
          discount += (khoahoc.giamgia * coupon.giamgia) / 100;
        }
      });
    });

    setTotalBeforeDiscount(beforeDiscount);
    setTotalDiscount(discount);
  }, [cartItems, appliedCoupons]);

  const xoagiohang = async (id) => {
    try {
      const userData = localStorage.getItem('data');
      const parsedData = JSON.parse(userData);
      if (!parsedData) {
        return null;
      }

      const payload = {
        id_khoahoc: id,
        id_nguoidung: parsedData.id,
      };

      await axios.post('http://127.0.0.1:8000/api/xoasanphamadd', payload);
      toast.success("Sản phẩm đã được xóa!");

      window.location.href = '/page/cart';
    } catch {
      toast.error("Failed to remove course from cart.");
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const couponCode = e.target.coupon_code.value.trim();
    const promo = KhuyenMai.find(
      (promo) =>
        promo.magiamgia.maso === couponCode && promo.magiamgia.trangthai === "Đã Duyệt"
    );

    if (promo) {
      const courseId = promo.id_khoahoc;
      const courseInCart = cartItems.some((item) =>
        item.khoahocs.some((khoahoc) => khoahoc.id === courseId)
      );

      if (courseInCart) {
        const existingCoupon = appliedCoupons.find((c) => c.id_khoahoc === courseId);
        if (existingCoupon) {
          toast.error("Một mã giảm giá đã được áp dụng cho khóa học này.");
          return;
        }

        const newCoupon = {
          id_magiamgia: promo.magiamgia.id,
          id_khoahoc: courseId,
          giamgia: promo.magiamgia.giamgia,
        };

        const updatedCoupons = [...appliedCoupons, newCoupon];
        setAppliedCoupons(updatedCoupons);
        localStorage.setItem("appliedCoupons", JSON.stringify(updatedCoupons));
        toast.success("Mã giảm giá áp dụng thành công!");
      } else {
        toast.error("Mã giảm giá không áp dụng cho bất kỳ khóa học nào trong giỏ hàng.");
      }
    } else {
      toast.error("Mã giảm giá không hợp lệ.");
    }
  };

  const NguoiDung = localStorage.getItem('data');
  const parsedData = NguoiDung ? JSON.parse(NguoiDung) : null;

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main className="mt-60">
        <div className="container">
          <h1 className="display-4 text-center mb-4">Giỏ Hàng Của Tôi</h1>
          <div className="table-responsive shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th></th>
                  <th>Hình ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Giảm Giá</th>
                  <th>Tổng phụ</th>
                </tr>
              </thead>
              <tbody>
  {cartItems.map((item, index) => (
    item.khoahocs.map((khoahoc, subIndex) => (
      <tr key={`${index}-${subIndex}`} style={{ fontSize: '1.2em', height: '60px', marginBottom: '10px' }}>
        <td className='text-center'>
          <button className="btn btn-danger btn-sm" onClick={() => xoagiohang(khoahoc.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </td>
        <td>
          <img src={khoahoc.hinh} className="img-fluid rounded" alt={khoahoc.ten} style={{ maxWidth: '100px' }} />
        </td>
        <td>{khoahoc.ten}</td>
        <td>
          <span>đ{khoahoc.gia}</span>
        </td>
        <td>
          <span>đ{khoahoc.giamgia}</span>
        </td>
        <td>
          <span className="fw-bold">đ{khoahoc.giamgia}</span>
        </td>
      </tr>
    ))
  ))}
</tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="text-center">
                    <button
                      className="bg-indigo-500 text-white font-bold p-2 rounded-lg"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Chọn Hoặc Nhập Mã Voucher
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="row justify-content-end mt-4">
            <div className="col-md-6">
              <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="card-header text-dark">
                  <h3 className="mb-0">Tổng Giỏ Hàng</h3>
                </div>
                <div className="card-body">
                  <table className="table mb-3">
                    <tbody>
                      <tr>
                        <th>Tổng phụ</th>
                        <td>đ{totalBeforeDiscount}</td>
                      </tr>
                      <tr>
                        <th>Giảm giá</th>
                        <td>đ{totalDiscount}</td>
                      </tr>
                      <tr className="table-active">
                        <th>Tổng cộng</th>
                        <td><strong>đ{totalBeforeDiscount - totalDiscount}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  {parsedData ? (
                    <div className="flex">
                      <a href="/page/checkout" className="text-indigo-700 font-bold bg-white shadow p-3 bg-body-tertiary rounded text-center w-full">
                        Tiến hành thanh toán
                      </a>
                    </div>
                  ) : (
                    <p className="text-center text-danger mt-3">Vui Lòng Đăng Nhập</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content shadow-sm p-3 mb-5 bg-body-tertiary rounded">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">Voucher</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <Voucher handleApplyCoupon={handleApplyCoupon} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Voucher = ({ handleApplyCoupon }) => {
  const [vouchers, setVouchers] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await showAllNguoiDungMaGiamGia();
        setVouchers(response);
      } catch (error) {
        console.error('Fetch error:', error);
        alert("Failed to fetch vouchers.");
      }
    };

    fetchVouchers();
  }, []);

  const handleSelectVoucher = (voucher) => {
    setCouponCode(voucher.magiamgia.maso);
    setSelectedVoucherId(voucher.id);
  };

  return (
    <div className="container my-4">
      <form className="mb-4" onSubmit={handleApplyCoupon}>
        <div className="row g-2 align-items-center">
          <div className="col-md-8">
            <input
              type="text"
              name="coupon_code"
              className="form-control"
              placeholder="Nhập mã giảm giá"
              required
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-warning w-100">
              Áp dụng
            </button>
          </div>
        </div>
        <small className="form-text text-muted">Mỗi khóa học chỉ áp dụng được một mã giảm giá.</small>
      </form>

      <div className="voucher-list overflow-auto" style={{ maxHeight: '400px' }}>
        {vouchers.map(voucher => (
          <div
            key={voucher.id}
            className={`card mb-3 ${selectedVoucherId === voucher.id ? 'border-warning' : 'border-secondary'} shadow-sm p-3 mb-5 bg-body-tertiary rounded`}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title">{voucher.magiamgia.maso}</h5>
                <span className={`badge ${voucher.magiamgia.trangthai === 'Đã Duyệt' ? 'bg-success' : 'bg-secondary'}`}>
                  {voucher.magiamgia.trangthai}
                </span>
              </div>
              <p className="card-text"><strong>Giảm giá:</strong> {voucher.magiamgia.giamgia}%</p>
              <p className="card-text"><strong>Giới hạn sử dụng:</strong> {voucher.dasudunghientai}</p>
              <p className="card-text"><strong>Sử dụng hiện tại:</strong> {voucher.magiamgia.sudunghientai}</p>
              <p className="card-text"><strong>Ngày bắt đầu:</strong> {new Date(voucher.magiamgia.ngaybatdau).toLocaleDateString()}</p>
              <p className="card-text"><strong>Ngày hết hạn:</strong> {new Date(voucher.magiamgia.ngayketthuc).toLocaleDateString()}</p>
              <button
                className={`btn ${selectedVoucherId === voucher.id ? 'btn-warning disabled' : 'btn-outline-warning'}`}
                onClick={() => handleSelectVoucher(voucher)}
                disabled={selectedVoucherId === voucher.id}
              >
                {selectedVoucherId === voucher.id ? 'Đã chọn' : 'Chọn'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;