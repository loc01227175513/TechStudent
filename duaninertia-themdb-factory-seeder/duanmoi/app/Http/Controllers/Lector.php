<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class Lector extends Controller
{
        public function index()
    {
         return Inertia::render('Lecture/Lecturer');
    }
}