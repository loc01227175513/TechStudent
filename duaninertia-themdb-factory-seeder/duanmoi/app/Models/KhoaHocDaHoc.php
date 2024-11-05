<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhoaHocDaHoc extends Model
{
    use HasFactory;
    protected $table = 'khoahocdahoc';
    protected $fillable = [
        'id',
        'id_nguoidung',
        'id_khoahoc',
        'trangthai',
        'created_at',
        'updated_at',
    ];
    public function khoaHoc(){
        return $this->belongsTo(KhoaHoc::class, "id_khoahoc");
    }
    public function nguoidung(){
       return $this->belongsTo(NguoiDung::class,
            "id_nguoidung");
    }
    public function chude(){
        return $this->hasMany(DanhGia::class, "id_khoahoc");
    }
    public function baihoc(){
        return $this->hasMany(BaiHoc::class, "id_khoahoc");
    }
}