<?php

namespace App\Http\Controllers\Lecturer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
class DetailKhoahocController extends Controller
{
    public function index()
    {
         return Inertia::render('Lecturer/Add/DetailKhoaHoc');
    }
}