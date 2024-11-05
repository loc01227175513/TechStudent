<?php

namespace Database\Factories;

use App\Models\DonhangChitiet;
use Illuminate\Database\Eloquent\Factories\Factory;

class DonhangChitietFactory extends Factory
{
    protected $model = DonhangChitiet::class;

    public function definition()
    {
        return [
            'gia' => $this->faker->numberBetween(100000, 1000000), // Giá sản phẩm giả lập
            'giamgia' => $this->faker->numberBetween(0, 100000), // Giảm giá giả lập
            'id_donhang' => $this->faker->numberBetween(1, 10), // Giả sử id_donhang từ 1 đến 10
            'id_khoahoc' => $this->faker->numberBetween(1, 10), // Giả sử id_khoahoc từ 1 đến 10
            'updated_at' => now(), // Thời gian cập nhật giả lập
            'created_at' => now(), // Thời gian tạo giả lập
        ];
    }
}