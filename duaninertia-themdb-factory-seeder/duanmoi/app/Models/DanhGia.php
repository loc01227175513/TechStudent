<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhGia extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'danhgia';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'id_khoahoc',
        'id_nguoidung',
        'binhluan', // Changed from noidung to binhluan
        'danhgia'
    ];

    /**
     * Get the course that the review belongs to.
     */
    public function khoahoc()
    {
        return $this->belongsTo(KhoaHoc::class, 'id_khoahoc', 'id');
    }

    /**
     * Get the user that made the review.
     */
    public function nguoidung()
    {
        return $this->belongsTo(NguoiDung::class, 'id_nguoidung', 'id');
    }
}