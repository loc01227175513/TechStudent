<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaiHoc extends Model
{    use HasFactory;
    protected $table = 'baihoc';
  
   
    protected $fillable = [
        "id",
        'ten',
        'id_khoahoc',
        'mota'
    ];
    public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc');
    }
   public function video()
    {
        return $this->hasMany(Video::class, 'id_baihoc');
    }
}