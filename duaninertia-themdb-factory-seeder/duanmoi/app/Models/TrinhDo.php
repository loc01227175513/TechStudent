<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrinhDo extends Model
{
    use HasFactory;

    protected $table = "trinhdo";

    protected $fillable = [
        "ten",
        "id_giangvien",
        "id_khoahoc",
    ];

    public function giangvien()
    {
        return $this->belongsTo(GiangVien::class, 'id_giangvien', 'id');
    }

    public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc', 'id');
    }
}