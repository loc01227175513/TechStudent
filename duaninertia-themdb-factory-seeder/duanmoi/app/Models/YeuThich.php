<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YeuThich extends Model
{
    use HasFactory;
   protected $table = 'yeuthich';
    protected $fillable = ['id_nguoidung', 'id_khoahoc'];
    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung', 'id');
    }
    public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc', 'id');
    }
}
