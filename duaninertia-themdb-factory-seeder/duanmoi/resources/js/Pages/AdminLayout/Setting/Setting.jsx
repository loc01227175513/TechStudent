import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Setting() {
    const [courses, setCourses] = useState([]);
    const [KhoaHocDaHoc, setKhoaHocDaHoc] = useState([]);
    const [KhoaHocMoi, setKhoaHocMoi] = useState([]);
    const [dataCounts, setDataCounts] = useState({});
    const [TatCaKhoaHoc, setTatCaKhoaHoc] = useState([]);
    const [TatCaNguoiDung, setTatCaNguoiDung] = useState([]);
    const  [theloai, setTheLoai] = useState([]);
    const  [theloaicon, setTheLoaiCon] = useState([]);
    const  [chude, setChuDe] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [
                    khoahoctrangthaiRes,
                    khoahocdahoanthanhRes,
                    khoahocmoiRes,
                    tatcakhoahocRes,
                    tatcanguoidungRes
                ] = await Promise.all([
                    fetch('/admin-api/khoahoctrangthai'),
                    fetch('/admin-api/khoahocdahoanthanh'),
                    fetch('/admin-api/khoahocmoi'),
                    fetch('/admin-api/Tatcakhoahoc'),
                    fetch('/admin-api/tatcanguoidung')
                ]);

                const [
                    khoahoctrangthaiData,
                    khoahocdahoanthanhData,
                    khoahocmoiData,
                    tatcakhoahocData,
                    tatcanguoidungData
                ] = await Promise.all([
                    khoahoctrangthaiRes.json(),
                    khoahocdahoanthanhRes.json(),
                    khoahocmoiRes.json(),
                    tatcakhoahocRes.json(),
                    tatcanguoidungRes.json()
                ]);

                setCourses(khoahoctrangthaiData.data || []);
                setKhoaHocDaHoc(khoahocdahoanthanhData.data || []);
                setKhoaHocMoi(khoahocmoiData.data || []);
                setTatCaKhoaHoc(tatcakhoahocData.data || []);
                setTatCaNguoiDung(tatcanguoidungData || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchDataCounts = async () => {
            try {
                const endpoints = [
                    '/admin-api/showAllChungChi',
                    '/admin-api/showAllDanhGia',
                    '/admin-api/showAllGiangVien',
                    '/admin-api/showAllNhanTin',
                    '/admin-api/showAllRutTien',
                    '/admin-api/showAllBangCap',
                    '/admin-api/showAllBaiHoc',
                    '/admin-api/showAllTrinhDo',
                    '/admin-api/showAllVideo',
                    '/admin-api/showAllVideoDaHoc',
                    '/admin-api/showAllTheNganHang',
                    '/admin-api/showAllMaGiamGia',
                    '/admin-api/showAllMaGiamGiaKhoaHoc',
                    '/admin-api/showAllNguoiDungMaGiamGia',
                    '/admin-api/showAllThanhToan',
                    '/admin-api/showAllDonHang',
                    '/admin-api/showAllDonHangChiTiet',
                    '/admin-api/showAllSoLuongDangKy',
                    '/admin-api/showAllDoanhThu'

                ];

                const responses = await Promise.all(endpoints.map(endpoint => fetch(endpoint)));
                const data = await Promise.all(responses.map(res => res.json()));

                const counts = {
                    ChungChi: data[0].length,
                    DanhGia: data[1].length,
                    GiangVien: data[2].length,
                    NhanTin: data[3].length,
                    RutTien: data[4].length,
                    BangCap: data[5].length,
                    BaiHoc: data[6].length,
                    TrinhDo: data[7].length,
                    Video: data[8].length,
                    VideoDaHoc: data[9].length,
                    TheNganHang: data[10].length,
                    MaGiamGia: data[11].length,
                    MaGiamGiaKhoaHoc: data[12].length,
                    NguoiDungMaGiamGia: data[13].length,
                    ThanhToan: data[14].length,
                    DonHang: data[15].length,
                    DonHangChiTiet: data[16].length,
                    SoLuongDangKy: data[17].length,
                    DoanhThu: data[18].length
                    
                };

                setDataCounts(counts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDataCounts();
    }, []);
    useEffect(() => {
        const fetchTheLoai = async () => {
            try {
                const response = await fetch('/api/theloai');
                const data = await response.json();
                const theloai = [];
                const theloaicon = [];
                const chude = [];
    
                data.data.forEach((item) => {
                    theloai.push(item);
                    item.theloaicons.forEach((subItem) => {
                        theloaicon.push(subItem);
                        subItem.chudes.forEach((chudeItem) => {
                            chude.push(chudeItem);
                        });
                    });
                });
    
                setTheLoai(theloai);
                setTheLoaiCon(theloaicon);
                setChuDe(chude);
            } catch (error) {
                console.error('Error fetching Thể Loại:', error);
            }
        };
    
        fetchTheLoai();
    }, []);
    console.log(theloai);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Task Section */}
            <section className="p-4">
                <h2 className="mb-4 text-xl font-semibold">Nhiệm vụ cần làm</h2>
                <div className="grid grid-cols-3 gap-4">
                    <Link href="/admin/dashboard" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Các khóa học đang chờ xử lý</span>
                            {courses.filter(course => course.trangthai === 'Pending').length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {courses.filter(course => course.trangthai === 'Pending').length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/admin/hoanthanh" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Các khóa học liên tục</span>
                            {courses.filter(course => course.trangthai === 'active').length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {courses.filter(course => course.trangthai === 'active').length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/admin/khoahodahoanhthanh" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Hoàn thành các khóa học</span>
                            {KhoaHocDaHoc.length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {KhoaHocDaHoc.length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/admin/khoahocdangkymoi" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span> Ghi danh mới</span>
                            {KhoaHocMoi.length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {KhoaHocMoi.length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/admin/khoahocbituchoi" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span> Các khóa học để xem xét</span>
                            {courses.filter(course => course.trangthai === 'Decline').length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {courses.filter(course => course.trangthai === 'Decline').length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>

                    <Link href="/admin/showAllCourse" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span> Quản lý tất cả khóa học </span>
                            {TatCaKhoaHoc.filter(course => course.id).length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {TatCaKhoaHoc.filter(course => course.id).length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/admin/ShowBanner" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Quản lý Banner</span>
                        </div>
                    </Link>
                    <Link href="/admin/Lotrinhkhoahoc" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Quản lý Lộ Trình Khóa Học</span>
                        </div>
                    </Link>
                    <Link href="/admin/adminCodeApi" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Quản lý Source Code</span>
                        </div>
                    </Link>
                    <Link href="/TestApi/TestApi" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Quản lý Api</span>
                        </div>
                    </Link>
                    <Link href="/admin/showAllUser" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Quản lý Người Dùng</span>
                            {TatCaNguoiDung.length > 0 ? (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">
                                    {TatCaNguoiDung.length}
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-white bg-red-600 rounded-full">0</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/admin/TheLoai" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Thể Loại</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{theloai.length || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/TheLoaiCon" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Thể Loại Con</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{theloaicon.length || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/ChuDe" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Chủ Đề</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{chude.length || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/ChungChi" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Chứng Chỉ</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.ChungChi}</span>
                        </div>
                    </Link>
                    <Link href="/admin/DanhGia" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Đánh Giá</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.DanhGia}</span>
                        </div>
                    </Link>
                    <Link href="/admin/GiangVien" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Giảng Viên</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.GiangVien}</span>
                        </div>
                    </Link>
                    <Link href="/admin/NhanTin" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Nhắn Tin</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.NhanTin}</span>
                        </div>
                    </Link>
                    <Link href="/admin/RutTien" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Rút Tiền</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.RutTien}</span>
                        </div>
                    </Link>
                    <Link href="/admin/BangCap" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Bằng Cấp</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.BangCap}</span>
                        </div>
                    </Link>
                    <Link href="/admin/BaiHoc" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Bài Học</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.BaiHoc}</span>
                        </div>
                    </Link>
                    <Link href="/admin/TrinhDo" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Trình Độ</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.TrinhDo}</span>
                        </div>
                    </Link>
                    <Link href="/admin/Video" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Video</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.Video}</span>
                        </div>
                    </Link>
                    <Link href="/admin/VideoDaHoc" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Video Đã Học</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.VideoDaHoc}</span>
                        </div>
                    </Link>
                    <Link href="/admin/TheNganHang" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Thẻ Ngân Hàng</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.TheNganHang}</span>
                        </div>
                    </Link>
                    <Link href="/admin/MaGiamGia" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Mã Giảm Giá</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.MaGiamGia}</span>
                        </div>
                    </Link>
                    <Link href="/admin/MaGiamGiaKhoaHoc" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Mã Giảm Giá Khóa Học</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.MaGiamGiaKhoaHoc}</span>
                        </div>
                    </Link>
                    <Link href="/admin/NguoiDungMaGiamGia" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Người Dùng Mã Giảm Giá</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.NguoiDungMaGiamGia}</span>
                        </div>
                    </Link>
                    <Link href="/admin/ThanhToan" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Thanh Toán</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.ThanhToan || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/DonHang" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Đơn Hàng</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.DonHang || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/DonHangChiTiet" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Chi Tiết Đơn Hàng</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.DonHangChiTiet || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/SoLuongDangKy" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Số Lượng Đăng Ký</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.SoLuongDangKy || 0}</span>
                        </div>
                    </Link>
                    <Link href="/admin/DoanhThu" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <span>Doanh Thu</span>
                            <span className="px-3 py-1 text-white bg-red-600 rounded-full">{dataCounts.DoanhThu || 0}</span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* KPI Section */}
            <section className="p-4">
                <h2 className="mb-4 text-xl font-semibold">KPI</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 text-center bg-gray-800 rounded-lg">
                        <p>KPI hiện tại</p>
                        <p className="text-2xl font-bold text-yellow-400">0</p>
                    </div>
                    <div className="p-4 text-center bg-gray-800 rounded-lg">
                        <p>Tối thiểu KPI</p>
                        <p className="text-2xl font-bold text-yellow-400">0</p>
                    </div>
                    <div className="p-4 text-center bg-gray-800 rounded-lg">
                        <p> Thu nhập vượt quá KPI</p>
                        <p className="text-2xl font-bold text-yellow-400">0 VND</p>
                    </div>
                    <div className="p-4 text-center bg-gray-800 rounded-lg">
                        <p> Thu nhập khác</p>
                        <p className="text-2xl font-bold text-yellow-400">0 VND</p>
                    </div>
                </div>
            </section>
        </div>
    );
}