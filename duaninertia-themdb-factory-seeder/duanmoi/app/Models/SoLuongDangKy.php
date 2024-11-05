<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoLuongDangKy extends Model
{
    use HasFactory;
    protected $table = 'soluongdangky';
    protected $fillable = [
        'id',
        'soluong',
        'id_khoahoc',
        'id_giangvien',
    ];
    public function khoahocs(){
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc', 'id');
    }
    public function giangvien(){
        return $this->belongsTo(GiangVien::class, 'id_giangvien', 'id');
    }

}