<?php

namespace Database\Factories;

use App\Models\GioHang;
use Illuminate\Database\Eloquent\Factories\Factory;

class GioHangFactory extends Factory
{
    protected $model = GioHang::class;

    public function definition()
    {
        return [
            'id_khoahoc' => $this->faker->numberBetween(1, 10), // Giả sử id_khoahoc từ 1 đến 10
            'id_nguoidung' => $this->faker->numberBetween(1, 10), // Giả sử id_nguoidung từ 1 đến 10
            'updated_at' => now(), // Thời gian cập nhật giả lập
            'created_at' => now(), // Thời gian tạo giả lập
        ];
    }
}