<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TheloaiTheloaicon extends Model
{
    use HasFactory;
    protected $table = 'theloai_theloaicon';
    protected  $fillable = ['ten', 'id_theloai'];
    

}