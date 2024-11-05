<?php

namespace Database\Factories;

use App\Models\Doanhthu;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoanhthuFactory extends Factory
{
    protected $model = Doanhthu::class;

    public function definition()
    {
        return [
            'tong' => $this->faker->numberBetween(1000000, 10000000), // Số tiền doanh thu giả lập
            'gia' => $this->faker->numberBetween(1000000, 10000000), // Số tiền giả lập
            'giamgia' => $this->faker->numberBetween(1000000, 10000000), // Số tiền giảm giá giả lập
            'trangthai' => 'Đã Thanh Toán', // Trạng thái mặc định
            'id_giangvien' => $this->faker->numberBetween(1, 10), // Giả sử id_giangvien từ 1 đến 10
            'id_khoahoc' => $this->faker->numberBetween(1, 10), // Giả sử id_khoahoc từ 1 đến 10
            'updated_at' => now(), // Thời gian cập nhật giả lập
            'created_at' => now(), // Thời gian tạo giả lập
        ];
    }
}