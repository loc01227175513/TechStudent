<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Khoahoc;
use App\Models\GioHang;
class khoahocController extends Controller
{
    public function index()
    {    
        $khoahocs = Khoahoc::all();
        return Inertia::render('Home/Home', ['khoahocs' => $khoahocs]);
    }

    public function show($id)
    {  
        return Inertia::render('Khoahoc/Khoahoc', ['id' => $id]);
    }
    public function showtheloai($id)
    {  
        return Inertia::render('Khoahoc/Khoahoctheloai', ['id' => $id]);
    }
    public function showtheloaicon($id)
    {  
        return Inertia::render('Khoahoc/Khoahoctheloaicon', ['id' => $id]);
    }
    public function Details($id)
    {   
        return Inertia::render('Detail/Detail', ['id' => $id]);
    }
}