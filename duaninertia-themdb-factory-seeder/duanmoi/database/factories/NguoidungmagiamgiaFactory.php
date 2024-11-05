<?php

namespace Database\Factories;

use App\Models\Nguoidungmagiamgia;
use Illuminate\Database\Eloquent\Factories\Factory;

class NguoidungmagiamgiaFactory extends Factory
{
    protected $model = Nguoidungmagiamgia::class;

    public function definition()
    {
        return [
            'trangthai' => $this->faker->randomElement(['Đã sử dụng', 'Chưa sử dụng']), // Trạng thái
            'dasudunghientai' => $this->faker->numberBetween(1, 10), // Số lần đã sử dụng hiện tại
            'id_nguoidung' => $this->faker->numberBetween(1, 100), // ID người dùng (giả lập)
            'id_magiamgia' => $this->faker->numberBetween(1, 100), // ID mã giảm giá (giả lập)
        ];
    }
}
