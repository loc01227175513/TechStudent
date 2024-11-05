<?php

namespace Database\Factories;

use App\Models\Khoahocdahoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class KhoahocdahocFactory extends Factory
{
    protected $model = Khoahocdahoc::class;

    public function definition()
    {
        return [
            'trangthai' => $this->faker->randomElement(['Đã Hoàn Thành']), // Trạng thái khóa học
            'id_khoahoc' => $this->faker->numberBetween(1, 10), // Giả sử id_khoahoc từ 1 đến 10
            'id_nguoidung' => $this->faker->numberBetween(1, 10), // Giả sử id_nguoidung từ 1 đến 10
        ];
    }
}