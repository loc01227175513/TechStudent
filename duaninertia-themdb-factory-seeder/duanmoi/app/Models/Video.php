<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{   protected $table = 'video';
    use HasFactory;
    protected $fillable = [
        'id',
        'ten',
        'id_baihoc',
        'thoiluong',
        'mota',
        'id_baihoc',
        'url_link',
    ];
    function baihoc(){
        return $this->belongsTo(BaiHoc::class,'id_baihoc','id');
    }
      public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc');
    }
}