<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TheoDoi extends Model
{
    use HasFactory;
    protected $table = 'theodoi';
    protected $fillable = ['id_nguoidung', 'id_giangvien'];
    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung', 'id');
    }
    public function giangvien()
    {
        return $this->belongsTo(GiangVien::class, 'id_giangvien', 'id');
    }
}
