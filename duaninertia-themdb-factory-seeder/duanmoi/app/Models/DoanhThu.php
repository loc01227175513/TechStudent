<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoanhThu extends Model
{   
    protected $table = 'doanhthu';
    use HasFactory;
    protected $fillable = [
        'id',
        'tong',
        'gia',
        'giamgia',
        'id_khoahoc',
        'id_giangvien',  
      
    ];
    function khoahocs(){
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc', 'id');
    }
    function giangvien(){
        return $this->belongsTo(GiangVien::class, 'id_giangvien', 'id');
    }
 
}