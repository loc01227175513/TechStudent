<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class donhang extends Model
{
    use HasFactory;
    protected $table = 'donhang';
    protected $fillable = [
        'id',
        'tong',
        'trangthai',
        'phuongthucthanhtoan',
        'id_nguoidung'
    ];
    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung');
    }
}