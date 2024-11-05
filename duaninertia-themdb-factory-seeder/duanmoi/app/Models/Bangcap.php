<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bangcap extends Model
{
    use HasFactory;
    protected $table = "bangcap";
    protected $fillable = ['ten', 'url', 'tochuc', 'nam', 'id_giangvien'];
    public function giangvien()
    {
        return $this->belongsTo(Giangvien::class, 'id_giangvien', 'id');
    }
    
}