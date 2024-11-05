<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThanhToan extends Model
{   
    use HasFactory;
    protected $table = 'thanhtoan';
    protected $fillable = [
        'tong',
        'trangthai',
        'id_khoahoc',
        'id_nguoidung',
    ];
    public function khoahocs()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc');
    }
    public function nguoidungs()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung');
    }
}