<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChucNangPhu extends Controller
{
    public function TheLoai()
    {
        return Inertia::render('AdminLayout/TheLoai/TheLoai');
    }
    public function TheLoaiCon()
    {
        return Inertia::render('AdminLayout/TheLoaiCon/TheLoaiCon');
    }
    public function ChuDe()
    {
        return Inertia::render('AdminLayout/ChuDe/ChuDe');
    }
    public function ChungChi()
    {
        return Inertia::render('AdminLayout/ChungChi/ChungChi');
    }
    public function DanhGia()
    {
        return Inertia::render('AdminLayout/DanhGia/DanhGia');
    }
    public function GiangVien()
    {
        return Inertia::render('AdminLayout/GiangVien/GiangVien');
    }
    public function NhanTin(){
        return Inertia::render('AdminLayout/NhanTin/NhanTin');
    }
    public function RutTien(){
        return Inertia::render('AdminLayout/RutTien/RutTien');
    }
    public function  BangCap(){
        return Inertia::render('AdminLayout/BangCap/BangCap');
    }
    public function BaiHoc(){
        return Inertia::render('AdminLayout/BaiHoc/BaiHoc');
    }
    public function TrinhDo(){
        return Inertia::render('AdminLayout/TrinhDo/TrinhDo');
    }
    public function Video(){
        return Inertia::render('AdminLayout/Video/Video');
    }
    public function VideoDaHoc(){
        return Inertia::render('AdminLayout/VideoDaHoc/VideoDaHoc');
    }
    public function TheNganHang(){
        return Inertia::render('AdminLayout/TheNganHang/TheNganHang');
    }
    public function MaGiamGia(){
        return Inertia::render('AdminLayout/MaGiamGia/MaGiamGia');
    }
    public function MaGiamGiaKhoaHoc(){
        return Inertia::render('AdminLayout/MaGiamGiaKhoaHoc/MaGiamGiaKhoaHoc');
    }
    public function NguoiDungMaGiamGia(){
        return Inertia::render('AdminLayout/NguoiDungMaGiamGia/NguoiDungMaGiamGia');
    }
    public function LoTrinhKhoaHoc(){
        return Inertia::render('AdminLayout/LoTrinhKhoaHoc/LoTrinhKhoaHoc');
    }

    
    public function ThanhToan(){
        return Inertia::render('AdminLayout/ThanhToan/ThanhToan');
    }
    public function DonHang(){
        return Inertia::render('AdminLayout/DonHang/DonHang');
    }
    public function DonHangChiTiet(){
        return Inertia::render('AdminLayout/DonHangChiTiet/DonHangChiTiet');
    }
    public function SoLuongDangKy(){
        return Inertia::render('AdminLayout/SoLuongDangKy/SoLuongDangKy');
    }
    public function DoanhThu(){
        return Inertia::render('AdminLayout/DoanhThu/DoanhThu');
    }
}


