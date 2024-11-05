<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoTrinhKhoaHocCon extends Model
{
    use HasFactory;
    protected $table = "lotrinhkhoahoc";
    protected $fillable = [
        'id',
        'id_lotrinhkhoahoc',
        'id_khoahoc',
    ];
    public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc');
    }
    public function lotrinhkhoahoc()
    {
        return $this->belongsTo(LoTrinhKhoaHoc::class, 'id_lotrinhkhoahoc');
    }
}
