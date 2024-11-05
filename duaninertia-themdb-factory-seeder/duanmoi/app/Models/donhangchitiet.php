<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class donhangchitiet extends Model
{
    use HasFactory;
    protected $table = 'donhangchitiet';
    protected $fillable = ['id', 'gia', 'giamgia', 'id_donhang', 'id_khoahoc'];
    public function donhang()
    {
        return $this->belongsTo(donhang::class, 'id_donhang');
    }
    public function khoahoc()
    {
        return $this->belongsTo(khoahoc::class, 'id_khoahoc');
    }
}