<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\khoahocController;
use App\Http\Controllers\Login;
use App\Http\Controllers\Register;
use App\Http\Controllers\Lector;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ThanhToanController;
use App\Http\Controllers\CartBank;
use App\Http\Controllers\Cource;
use App\Http\Controllers\Mylearning;



use App\Http\Controllers\Lecturer\Dashboard;
use App\Http\Controllers\Lecturer\DetailKhoahocController;
use App\Http\Controllers\Lecturer\Motakhoahoc;
use App\Http\Controllers\Lecturer\TrangDichController;
use App\Http\Controllers\Lecturer\TrangGiaKhoaHoc;
use App\Http\Controllers\Lecturer\DoanhThuController;


Route::get("/", [khoahocController      ::class,"index"])->name("home");
Route::get("/KhoahocChude/{id}", [khoahocController::class,"show"])->name("khoahoc.show");
Route::get("/Khoahoctheloai/{id}", [khoahocController::class,"showtheloai"])->name("khoahoctheloai.show");
Route::get("/Khoahoctheloaicon/{id}", [khoahocController::class, "showtheloaicon"])->name("khoahoctheloaicon.show");
Route::get("/KhoahocChiTiet/{id}", [khoahocController::class,"Details"])->name("khoahoc.Details");
Route::get("/login", [Login::class,"index"])->name("Login");
Route::get("/dangky", [Register::class,"index"])->name("Register"); // Changed route name to "Register"
Route::get("/chuyendoi", [Lector::class,"index"])->name("chuyendoi");
Route::get("/giohang", [CartController::class, "index"])->name("cart");
Route::get("/thanhtoan", [ThanhToanController::class, "index"])->name("checkout.index");   
Route::get("/thenganhang", [CartBank::class, "index"])->name("thenganhang.index");   
Route::get("/hocbai/{id}", [Cource::class, "index"])->name("hocbai.index");
Route::get("/baihoccuatoi", [Mylearning::class,"index"])->name("mylearning.index");

// Lecturer
Route::get("Lecturer", [Dashboard::class, "index"])->name("Lecturer.index");
Route::get("DetailKhoaHoc", [DetailKhoahocController::class, "index"])->name("DetailLecturer.index");
Route::get("MotaKhoaHoc/{id}", [Motakhoahoc::class, "index"])->name("Motakhoahoc.index");
Route::get("TrangDichKhoaHoc", [TrangDichController::class, "index"])->name("TrangDichKhoaHoc.index");
Route::get("TrangGiaKhoaHoc", [TrangGiaKhoaHoc::class, "index"])->name("TrangGiaKhoaHoc.index");
// Lecturer Doanh Thu
Route::get("GiangVienDoanhThu", [DoanhThuController::class, "index"])->name("DoanhThu.index");