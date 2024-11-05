<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magiamgia extends Model
{
    use HasFactory;
    protected $table = 'magiamgia';
    protected $fillable = [
        'maso',
        'giamgia',
        'luotsudung',
        'sudunghientai',
        'trangthai',
        'ngaybatdau',
        'ngayketthuc',
        'id_giangvien',
    ];
}