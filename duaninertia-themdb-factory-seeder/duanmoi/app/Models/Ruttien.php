<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruttien extends Model
{
    use HasFactory;
    protected $table = "ruttien";
    protected $fillable = ['tong', 'id_giangvien', 'id_thenganhang', 'trangthai','tong' ,'created_at', 'updated_at'];
    public function giangvien()
    {
        return $this->belongsTo('App\Models\Giangvien', 'id_giangvien', 'id');
    }
    public function thenganhang()
    {
        return $this->belongsTo('App\Models\Thenganhang', 'id_thenganhang', 'id');
    }
}