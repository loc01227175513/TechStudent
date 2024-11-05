<?php

namespace Database\Factories;

use App\Models\Donhang;
use Illuminate\Database\Eloquent\Factories\Factory;

class DonhangFactory extends Factory
{
    protected $model = Donhang::class;

    public function definition()
    {
        return [
            'tong' => $this->faker->numberBetween(1000000, 10000000), // Tổng tiền giả lập
            'trangthai' => 'Đã Thanh Toán', // Trạng thái mặc định
            'phuongthucthanhtoan' => 'Chuyển Khoản', // Phương thức thanh toán mặc định
            'id_nguoidung' => $this->faker->numberBetween(1, 10), // Giả sử id_nguoidung từ 1 đến 10
            'updated_at' => now(), // Thời gian cập nhật giả lập
            'created_at' => now(), // Thời gian tạo giả lập
        ];
    }
}