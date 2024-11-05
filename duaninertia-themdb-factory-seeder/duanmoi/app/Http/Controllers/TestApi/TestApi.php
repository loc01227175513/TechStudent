<?php

namespace App\Http\Controllers\TestApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
class TestApi extends Controller
{
    public function index()
    {
        return Inertia::render('AdminLayout/TestApi/TestApi');
    }
}