<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoDaHoc extends Model
{   protected $table = 'videodahoc';
    use HasFactory;
    protected $fillable = [
        'id',
        'trangthai',
        'id_video',
        'id_nguoidung',
    ];
public function video()
{
    return $this->belongsTo(Video::class, 'id_video', 'id');
}

public function baihoc()
{
    return $this->belongsTo(BaiHoc::class, 'id_baihoc', 'id');
}
    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung', 'id');
    }
}