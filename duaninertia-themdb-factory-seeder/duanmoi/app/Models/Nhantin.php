<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nhantin extends Model
{
   use HasFactory;

    protected $table = "nhantin";

    protected $fillable = ['noidung', 'id_nguoidung', 'id_giangvien']; // Ensure lowercase

    protected $casts = [
        'noidung' => 'array',
    ];

    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung', 'id');
    }

    public function giangvien()
    {
        return $this->belongsTo(GiangVien::class, 'id_giangvien', 'id'); // Ensure lowercase
    }
}