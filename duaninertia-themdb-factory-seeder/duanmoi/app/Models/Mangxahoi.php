<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mangxahoi extends Model
{
    use HasFactory;
    protected $table = 'mangxahoi';
 
    protected $fillable = ['nentang', 'url', 'id_nguoidung', 'id_giangvien'];
}