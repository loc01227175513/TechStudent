<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TheLoaiCon extends Model
{
    use HasFactory;

    protected $table = 'theloai_theloaicon';

    protected $fillable = [
        'id',
        'ten',
        'hinh',
        'id_theloai',
    ];

    public function chudes()
    {
        return $this->hasMany(ChuDe::class, 'id_theloaicon');
    }
    public function khoahocs()
    {
        return $this->hasMany(KhoaHoc::class, 'id_theloaicon');
    }
    public function giangvien()
    {
        return $this->hasMany(GiangVien::class, 'id_theloaicon');
    }
}