<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nguoidungmagiamgia extends Model
{
    use HasFactory;
    protected $table = "nguoidungmagiamgia";
    protected $fillable = [
        'trangthai',
        'dasudunghientai',
        'id_nguoidung',
        'id_magiamgia',
    ];
    public function magiamgia()
    {
        return $this->belongsTo(Magiamgia::class, 'id_magiamgia', 'id');
    }
    public function nguoidung()
    {
        return $this->belongsTo(Nguoidung::class, 'id_nguoidung', 'id');
    }
}