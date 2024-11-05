<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class Mylearning extends Controller
{
    public function index()
    {
        return Inertia::render('Mylearning/Mylearning');
    }
}