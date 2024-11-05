<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chungchi extends Model
{
    use HasFactory;
    protected $table = 'chungchi';
    protected $fillable = [
        'ten',
        'phathanhboi',
        'hieuluc',
        'giaychungnhan',
        'id_khoahoc',
        'id_nguoidung',
        'loai',
        'id_chungchi',
    ];
}