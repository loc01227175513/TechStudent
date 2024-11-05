<?php

namespace App\Http\Controllers\Lecturer;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrangGiaKhoaHoc extends Controller
{
    public function index()
    {
        // Trả về view sử dụng Inertia và truyền ID tới view
        return Inertia::render('Lecturer/Add/TrangGiaKhoaHoc');
    }
}