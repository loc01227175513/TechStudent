<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class Cource extends Controller
{
    public function index($id)
    {
        return Inertia::render('Cource/Cource', ['id' => $id]);
    }

   
}