<?php

namespace App\Http\Controllers\Lecturer;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class Motakhoahoc extends Controller
{
    // Hàm index nhận $id và truyền tới view qua Inertia
    public function index($id)
    {
        // Trả về view sử dụng Inertia và truyền ID tới view
        return Inertia::render('Lecturer/Add/MotaKhoahoc', [
            'id' => $id
        ]);
    }
}