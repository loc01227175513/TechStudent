<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
class Dashboard extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('AdminLayout/ChoXuLy');
    }
    public function progress()
    {
        return Inertia::render('AdminLayout/DangTienHanh');
    }
    public function completed()
    {
        return Inertia::render('AdminLayout/HoanThanh');
    }
    public function Details(Request $request, $id)
    {
        return Inertia::render('AdminLayout/ChiTiet/ChiTietKhoaHoc', ['id' => $id]);
    }
    public function DaHoc()
    {
        return Inertia::render('AdminLayout/KhoaHocDaHoc');
    }
    public function DangKyMoi()
    {
        return Inertia::render('AdminLayout/DangKyMoi');
    }
    public function TuChoi()
    {
        return Inertia::render('AdminLayout/KhoaHocTuChoi');
    }
    
}