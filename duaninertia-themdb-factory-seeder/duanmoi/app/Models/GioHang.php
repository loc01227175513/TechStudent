<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{   
    protected $table = 'giohang';
    use HasFactory;
    protected $fillable = [
        'id_nguoidung',
        'id_khoahoc',
    ];

    public function khoahocs()
    {
        return $this->belongsTo(KhoaHoc::class, 'id', 'id_khoahoc');
    }
    public function nguoidungs()
    {
        return $this->belongsTo(NguoiDung::class, 'id', 'id_nguoidung');
    }
}