<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Dashboard;
use App\Http\Controllers\Admin\Student;
use App\Http\Controllers\Admin\Setting;
use App\Http\Controllers\Admin\EditCodeApi;
use App\Http\Controllers\Admin\EditBanner;
use App\Http\Controllers\Admin\course;
use App\Http\Controllers\Admin\User;
use App\Http\Controllers\Admin\ChucNangPhu;


Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [Dashboard::class, 'index']);
    Route::get('/dangtienhanh', [Dashboard::class, 'progress']);
    Route::get('/hoanthanh', [Dashboard::class, 'completed']);  
    Route::Get('/khoahocdangtienhanh/{id}', [Dashboard::class, 'Details']);
    Route::Get('/khoahodahoanhthanh', [Dashboard::class, 'DaHoc']);
    Route::Get('/khoahocdangkymoi', [Dashboard::class, 'DangKyMoi']);
    Route::Get('/khoahocbituchoi', [Dashboard::class, 'TuChoi']);
    
    Route::Get('/ThemBanner', [EditBanner::class, 'ThemBanner']);
    Route::Get('/ShowBanner', [EditBanner::class, 'ShowBanner']);
    Route::Get("/showAllCourse" , [Course::class, 'index']);
    Route::Get("/showAllUser" , [User::class, 'index']);
    
    Route::get('/thongke', [Setting::class,'index']);
    Route::get('/sinhvien', [Student::class, 'index']);

  
    Route::get('TheLoai', [ChucNangPhu::class, 'TheLoai']);
    Route::get('TheLoaiCon', [ChucNangPhu::class, 'TheLoaiCon']);
    Route::get('ChuDe', [ChucNangPhu::class, 'ChuDe']);
    Route::get('ChungChi', [ChucNangPhu::class, 'ChungChi']);
    Route::get('DanhGia', [ChucNangPhu::class, 'DanhGia']);
    Route::get('GiangVien', [ChucNangPhu::class, 'GiangVien']);
    Route::get('NhanTin', [ChucNangPhu::class, 'NhanTin']);
    Route::get('RutTien', [ChucNangPhu::class, 'RutTien']);
    Route::get('BangCap', [ChucNangPhu::class, 'BangCap']);
    Route::get('BaiHoc', [ChucNangPhu::class, 'BaiHoc']);
    Route::get('TrinhDo', [ChucNangPhu::class, 'TrinhDo']);
    Route::get('Video', [ChucNangPhu::class, 'Video']);
    Route::get('VideoDaHoc', [ChucNangPhu::class, 'VideoDaHoc']);
    Route::get('TheNganHang', [ChucNangPhu::class, 'TheNganHang']);
    Route::get('MaGiamGia', [ChucNangPhu::class, 'MaGiamGia']);
    Route::get("MaGiamGiaKhoaHoc", [ChucNangPhu::class, 'MaGiamGiaKhoaHoc']);
    Route::get("NguoiDungMaGiamGia", [ChucNangPhu::class, 'NguoiDungMaGiamGia']);
    Route::get("Lotrinhkhoahoc", [ChucNangPhu::class, 'LoTrinhKhoaHoc']);
    
    Route::get("ThanhToan", [ChucNangPhu::class, 'ThanhToan']);
    Route::get("DonHang", [ChucNangPhu::class, 'DonHang']);
    Route::get("DonHangChiTiet", [ChucNangPhu::class, 'DonHangChiTiet']);
    Route::get("SoLuongDangKy", [ChucNangPhu::class, 'SoLuongDangKy']);
    Route::get("DoanhThu", [ChucNangPhu::class , 'DoanhThu']);






























    //chỉnh sửa code
    Route::get('adminCodeApi', [EditCodeApi::class,'index']);
});