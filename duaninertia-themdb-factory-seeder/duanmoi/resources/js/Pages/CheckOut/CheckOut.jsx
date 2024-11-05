import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckOut = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [newItem, setNewItem] = useState({
        ten: '',
        gia: '',
        soluong: '',
        hinh: '',
        tenGiangVien: '',
        trangthai: '',
        danhgia: []
    });
    const [paymentDetails, setPaymentDetails] = useState({
        nameOnCard: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('data');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                axios.post('/api/showgiohang', { id_nguoidung: parsedData.id })
                    .then(response => {
                        setCartItems(response.data.data);
                        const total = response.data.data.reduce((sum, item) => {
                            return sum + item.khoahocs.reduce((itemSum, khoahoc) => itemSum + khoahoc.giamgia, 0);
                        }, 0);
                        setTotalPrice(total);
                    })
                    .catch(error => {
                        console.error('There was an error fetching the cart items!', error);
                    });
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
            }
        } else {
            console.error('No user data found in localStorage');
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePaymentInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateCardDetails = () => {
        const [month, year] = paymentDetails.expiryDate.split('/');
        axios.post('/api/thenganhang', {
            tenthe: paymentDetails.nameOnCard,
            sothe: paymentDetails.cardNumber,
            thang: month,
            nam: year,
            mabaomat: paymentDetails.cvc
        })
            .then(response => {
                if (response.data.success) {
                    setValidationMessage('Card details are valid.');
                    setErrorMessage('');
                } else {
                    setValidationMessage('');
                    setErrorMessage('Card details are invalid. Please check your card details and try again.');
                }
            })
            .catch(error => {
                console.error('There was an error validating the card details!', error);
                setValidationMessage('');
                setErrorMessage('There was an error validating the card details. Please try again later.');
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!paymentDetails.nameOnCard || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin thẻ ngân hàng.');
            return;
        }
        const [month, year] = paymentDetails.expiryDate.split('/');
        axios.post('/api/thenganhang', {
            tenthe: paymentDetails.nameOnCard,
            sothe: paymentDetails.cardNumber,
            thang: month,
            nam: year,
            mabaomat: paymentDetails.cvc,
            total: totalPrice.toFixed(2)
        })
            .then(response => {
                if (response.data.success) {
                    axios.post('/api/thanhtoan', {
                        total: totalPrice.toFixed(2),
                        id_nguoidung: JSON.parse(localStorage.getItem('data')).id,
                        id_khoahoc: cartItems.map(item => item.khoahocs.map(khoahoc => khoahoc.id)),
                        id_giangvien: cartItems.map(item => item.khoahocs.map(khoahoc => khoahoc.id_giangvien)),
                        gia: cartItems.map(item => item.khoahocs.map(khoahoc => khoahoc.gia)),
                        giamgia: cartItems.map(item => item.khoahocs.map(khoahoc => khoahoc.giamgia)),
                        id_giohang: cartItems.map(item => item.id)
                    })
                        .then(response => {
                            if (response.data.success) {
                                axios.post('/api/xoagiohang', {
                                    total: totalPrice.toFixed(2),
                                    id_nguoidung: JSON.parse(localStorage.getItem('data')).id,
                                    id_khoahoc: cartItems.map(item => item.khoahocs.map(khoahoc => khoahoc.id)),
                                }).then(response => {
                                    if (response.data.success) {
                                        console.log('Xóa giỏ hàng thành công');
                                    } else {
                                        console.error('Xóa giỏ hàng thất bại');
                                    }
                                })

                                setValidationMessage('Thanh toán thành công.');
                                setErrorMessage('');
                                window.location.href = '/';
                            } else {
                                setValidationMessage('');
                                setErrorMessage('Thanh toán thất bại. Vui lòng kiểm tra lại thông tin thẻ.');
                            }
                        })
                        .catch(error => {
                            console.error('There was an error processing the payment!', error);
                            setValidationMessage('');
                            setErrorMessage('Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.');
                        });
                } else {
                    setValidationMessage('');
                    setErrorMessage('Thanh toán thất bại. Vui lòng kiểm tra lại thông tin thẻ.');
                }
            })
            .catch(error => {
                console.error('There was an error processing the payment!', error);
                setValidationMessage('');
                setErrorMessage('Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.');
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Thanh Toán</h1>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div className="flex flex-col lg:flex-row -mx-4">
                        <div className="w-full lg:w-2/3 px-4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Các khóa học trong giỏ hàng</h2>
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        item.khoahocs.map(khoahoc => (
                                            <div key={khoahoc.id} className="flex items-center border-b pb-4">
                                                <img src={khoahoc.hinh} alt={khoahoc.ten} className="w-24 h-24 object-cover rounded-md mr-4" />
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-medium text-gray-800">{khoahoc.ten}</h3>
                                                    <p className="text-gray-600">Giảng viên: {khoahoc.tenGiangVien}</p>
                                                    <p className="text-gray-600">Giá: <span className="text-red-500 font-semibold">${khoahoc.gia}</span></p>
                                                    <p className="text-gray-600">Giảm Giá: <span className="text-red-500 font-semibold">${khoahoc.giamgia}</span></p>
                                                </div>
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thông Tin Thanh Toán</h2>
                                {errorMessage && (
                                    <div className="mb-4 text-red-600">
                                        {errorMessage}
                                    </div>
                                )}
                                {validationMessage && (
                                    <div className="mb-4 text-green-600">
                                        {validationMessage}
                                    </div>
                                )}
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Name on card</label>
                                        <input
                                            type="text"
                                            name="nameOnCard"
                                            value={paymentDetails.nameOnCard}
                                            onChange={handlePaymentInputChange}
                                            onBlur={validateCardDetails}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Card number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentDetails.cardNumber}
                                            onChange={handlePaymentInputChange}
                                            onBlur={validateCardDetails}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                            required
                                        />
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/2 pr-2">
                                            <label className="block text-gray-700">Expiry date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={paymentDetails.expiryDate}
                                                onChange={handlePaymentInputChange}
                                                onBlur={validateCardDetails}
                                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <label className="block text-gray-700">CVC/CVV</label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={paymentDetails.cvc}
                                                onChange={handlePaymentInputChange}
                                                onBlur={validateCardDetails}
                                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-purple-600 text-white py-3 mt-4 rounded-md hover:bg-purple-700 transition duration-200">
                                        Thanh Toán ${totalPrice.toFixed(2)}
                                    </button>
                                </form>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tóm Tắt Đơn Hàng</h2>
                                <div className="border-b pb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Tổng cộng:</span>
                                        <span className="text-gray-800 font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Giảm giá:</span>
                                        <span className="text-gray-800 font-semibold">$0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Thành tiền:</span>
                                        <span className="text-gray-800 font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <a href="/" className="text-purple-600 hover:underline">Tiếp tục mua sắm</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckOut;
