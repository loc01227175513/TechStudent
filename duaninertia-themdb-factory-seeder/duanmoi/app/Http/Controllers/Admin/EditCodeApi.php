<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
class EditCodeApi extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('AdminLayout/EditCode/EditCodeApi');
    }
}