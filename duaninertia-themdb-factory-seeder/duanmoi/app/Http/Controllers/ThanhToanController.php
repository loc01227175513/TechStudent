<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ThanhToanController extends Controller
{
     public function index()
    {
        return Inertia::render("CheckOut/CheckOut");
    }
}