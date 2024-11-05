<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
 
class CartBank extends Controller
{
    function index(Request $request){
         return Inertia::render('Login/Login');
    }
}