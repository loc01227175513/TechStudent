<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuDe extends Model
{
    use HasFactory;

    protected $table = 'chude'; // Specify the correct table name

    protected $fillable = [
        'id',
        'ten',
        'hinh', 
        'mota',
        'id_theloaicon',
    ];

    public function theLoaiCon()
    {
        return $this->belongsTo(TheLoaiCon::class, 'id_theloaicon');
    }
    public function khoahocs(){
        return $this->hasMany(KhoaHoc::class,'id_chude');
    }
    
}