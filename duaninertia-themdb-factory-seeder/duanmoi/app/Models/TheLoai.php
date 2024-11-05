<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TheLoai extends Model
{
    use HasFactory;

    protected $table = 'theloai_theloaicon';

    protected $fillable = [
        'id',
        'ten',
        'hinh',
        'id_theloai',
    ];

    public function theloaicons()
    {
        return $this->hasMany(TheLoaiCon::class, 'id_theloai');
    }
    public function chudes()
    {
        return $this->hasMany(ChuDe::class, 'id_theloaicon');
    }
    public function khoahocs()
    {
        return $this->hasMany(Khoahoc::class, 'id_theloai');
    }
    public function giangvien()
    {
        return $this->hasMany(GiangVien::class, 'id_theloai');
    }
}