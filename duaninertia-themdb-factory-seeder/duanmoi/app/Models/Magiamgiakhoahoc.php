<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magiamgiakhoahoc extends Model
{
    use HasFactory;
    protected $table = 'magiamgiakhoahoc';
    protected $fillable = ['id_khoahoc', 'id_magiamgia'];
    public function khoahoc(){
        return $this->belongsTo('App\Models\Khoahoc', 'id_khoahoc', 'id');
    }
    public function magiamgia(){
        return $this->belongsTo('App\Models\Magiamgia', 'id_magiamgia', 'id');
    }
    
}