<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Inertia\Inertia;

class Register extends Controller
{
    public function index()
    {
         return Inertia::render('Register/Register');
    }
  
}