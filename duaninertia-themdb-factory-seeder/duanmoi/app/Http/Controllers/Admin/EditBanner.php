<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
class EditBanner extends Controller
{
    public function ThemBanner()
    {
        return Inertia::render('AdminLayout/EditBanner/AddBanner');
    }
    public function ShowBanner()
    {
        return Inertia::render('AdminLayout/EditBanner/ShowBanner');
    }
   
}