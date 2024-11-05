<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NguoiDung extends Model
{   
    protected $table = 'nguoidung'; // Updated table name
    protected $fillable = [
        'id',
        'ho',
        'ten',
        'email',
        'dienthoai',
        'tentaikhoan',
        'matkhau',  
        'hinh',
        'trangthai',
        'tieusu',
        'vaitro'
    ];
    
    use HasFactory;

    public function giangvien()
    {
        return $this->hasOne(GiangVien::class, 'id_nguoidung', 'id');
    }

    public function giohangs()
    {
        return $this->hasMany(GioHang::class, 'id_nguoidung', 'id');
    }
}