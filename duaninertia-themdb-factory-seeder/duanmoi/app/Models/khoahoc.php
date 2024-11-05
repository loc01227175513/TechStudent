<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GiangVien;
use App\Models\MoTa;
use App\Models\ChuDe;
use App\Models\TheLoai;
use App\Models\TheLoaiCon;

class khoahoc extends Model
{
    protected $table = 'khoahoc';
    protected $fillable = [
        'ten',
        'hinh',
        'gia',
        'giamgia',
        'mota',
        'dieukien',
        'muctieu',
        'id_chude',
        'id_theloaicon',
        'trangthai',
        'id_theloai',
        'id_giangvien',
    ];
    use HasFactory;
    public function giangvien()
    {
        return $this->belongsTo(GiangVien::class, 'id_giangvien');
    }
    function chude()
    {
        return $this->belongsTo(ChuDe::class, 'id_chude',);
    }
    public function theloai()
    {
        return $this->belongsTo(TheLoai::class, 'id_theloai', 'id');
    }
    function theloaicon()
    {
        return $this->belongsTo(TheLoaiCon::class, 'id_theloaicon', 'id');
    }
    public function mota()
    {
        return $this->hasOne(MoTa::class, 'id_khoahoc', 'id');
    }
    public function baihocs()
    {
        return $this->hasMany(BaiHoc::class, 'id_khoahoc', 'id');
    }
    public function giohangs()
    {
        return $this->hasMany(GioHang::class, 'id_khoahoc', 'id');
    }
    public function videos()
    {
        return $this->hasMany(Video::class, 'id_khoahoc');
    }
    public function danhgia()
    {
        return $this->hasMany(DanhGia::class, 'id_khoahoc');
    }
    public function ThanhToan()
    {
        return $this->hasMany(ThanhToan::class, 'id_khoahoc');
    }

}