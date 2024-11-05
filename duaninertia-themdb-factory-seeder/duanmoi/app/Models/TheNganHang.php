<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TheNganHang extends Model
{   
    protected $table = 'thenganhang';
    use HasFactory;
    protected $fillable = [
        'tenthe',
        'sothe',
        'thang',
        'nam',
        'mabaomat',
        'tien',
    ];
    
}