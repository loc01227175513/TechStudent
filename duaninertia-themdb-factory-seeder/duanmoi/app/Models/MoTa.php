<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\KhoaHoc;
class MoTa extends Model
{
    protected $table = 'mota';
    use HasFactory;
    
    protected $fillable = [
        'id',
        'ten',
        'mota',
        'id_khoahoc',
    ];
    function khoahoc(){
        return $this->belongsTo(\App\Models\KhoaHoc::class, 'id_khoahoc', 'id');
    }
}