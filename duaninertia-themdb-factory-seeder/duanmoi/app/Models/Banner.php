<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{   

    protected $table = 'banners';
    use HasFactory;
    protected $fillable = [
        'id',
        'tieude',
        'hinh',
        'mota',
        'trangthai',
        'created_at',
        'updated_at',
    ];
}