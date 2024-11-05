<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChungChiNguoiDung extends Model
{
    protected $table = 'chungchi';
    protected $fillable = ['id_khoahoc', 'id_nguoidung'];
    use HasFactory;
    public function khoahoc()
    {
        return $this->belongsTo(Khoahoc::class, 'id_khoahoc');
    }
    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung');
    }
}
