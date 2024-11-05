<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoTrinhKhoaHoc extends Model
{   
    use HasFactory;
    protected $table = "lotrinhkhoahoc";
    protected $fillable = [
        'id',
        'ten',
        'mota',
        'hinh',
    ];
    public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc');
    }
   
}
