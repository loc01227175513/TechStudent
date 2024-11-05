<?php

namespace Database\Factories;

use App\Models\VideoDaHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoDaHocFactory extends Factory
{
    protected $model = VideoDaHoc::class;

    public function definition()
    {
        return [
            'trangthai' => $this->faker->randomElement(['Đã xem', 'Chưa xem']),
            'id_video' => \App\Models\Video::factory(),
            'id_nguoidung' => \App\Models\NguoiDung::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}