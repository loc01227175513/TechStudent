<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiangVien extends Model
{   protected $table = 'giangvien';
    protected $fillable = [
        'id',
        'ten',
        'email',
        'password',
        'hinh',
        'dienthoai',
        'id_nguoidung',
        'tieusu',
        'tongdoanhthu',
        'sodukhadung',
        
    ];
    use HasFactory;
    public function nguoidung(){
        return $this->belongsTo(NguoiDung::class,'id_nguoidung');
    }
     public function chude()
    {
        return $this->belongsTo(ChuDe::class);
    }
    public function khoahoc(){
        return $this->hasMany(KhoaHoc::class);
    }
    public function giangvien(){
        return $this->hasMany(GiangVien::class);
    }   

    // In GiangVien.php model
  
    public function mangxahoi()
{
    return $this->hasMany(MangXaHoi::class, 'id_nguoidung', 'id_nguoidung');
}
    public function getMangXaHoiByGiangVienAndNguoiDung($id_giangvien, $id_nguoidung)
    {
        return MangXaHoi::where(function ($query) use ($id_giangvien) {
                            if (!is_null($id_giangvien)) {
                                $query->where('id_giangvien', $id_giangvien);
                            }
                        })
                        ->where('id_nguoidung', $id_nguoidung)
                        ->get();
    }
}