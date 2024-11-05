<?php

namespace App\Http\Controllers\Lecturer;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class Dashboard extends Controller
{
    function index(Request $request){
         return Inertia::render('Lecturer/Dashboard');
    }
}