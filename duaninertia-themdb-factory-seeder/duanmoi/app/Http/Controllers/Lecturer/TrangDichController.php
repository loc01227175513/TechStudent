<?php

namespace App\Http\Controllers\Lecturer;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class TrangDichController extends Controller
{
    public function index()
    {
         return Inertia::render('Lecturer/Add/TrangDich');
    }
}