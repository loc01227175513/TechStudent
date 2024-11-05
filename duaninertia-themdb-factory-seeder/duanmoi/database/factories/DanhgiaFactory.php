<?php

namespace Database\Factories;

use App\Models\Danhgia;
use Illuminate\Database\Eloquent\Factories\Factory;

class DanhgiaFactory extends Factory
{
    protected $model = Danhgia::class;

    public function definition()
    {
        return [
            'danhgia' => $this->faker->numberBetween(1, 5), // Đánh giá giả lập từ 1 đến 5
            'binhluan' => $this->faker->sentence(10), // Bình luận giả lập
            'id_khoahoc' => $this->faker->numberBetween(1, 10), // Giả sử id_khoahoc từ 1 đến 10
            'id_nguoidung' => $this->faker->numberBetween(1, 10), // Giả sử id_nguoidung từ 1 đến 10
            'updated_at' => now(), // Thời gian cập nhật giả lập
            'created_at' => now(), // Thời gian tạo giả lập
        ];
    }
}