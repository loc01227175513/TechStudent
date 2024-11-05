<?php

namespace Database\Factories;

use App\Models\Nguoidung;
use Illuminate\Database\Eloquent\Factories\Factory;

class NguoidungFactory extends Factory
{
    protected $model = Nguoidung::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->name, // Tên người dùng
            'email' => $this->faker->unique()->safeEmail, // Email duy nhất
            'dienthoai' => $this->faker->phoneNumber, // Số điện thoại
            'hinh' => $this->faker->imageUrl(), // URL hình ảnh
            'matkhau' => bcrypt('password'), // Mật khẩu đã được mã hóa
            'vaitro' => $this->faker->numberBetween(0, 2), // Vai trò từ 0 đến 2
        ];
    }
}