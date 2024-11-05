<?php

namespace Database\Factories;

use App\Models\Mangxahoi;
use App\Models\Nguoidung;
use App\Models\Giangvien;
use Illuminate\Database\Eloquent\Factories\Factory;

class MangxahoiFactory extends Factory
{
    protected $model = Mangxahoi::class;

    public function definition()
    {
        return [
            'nentang' => $this->faker->randomElement(['facebook', 'skype', 'linkedin', 'pinterest', 'github']), // Tên nền tảng xã hội
            'url' => $this->faker->url, // URL của nền tảng
            'id_nguoidung' => Nguoidung::inRandomOrder()->first()->id, // Lấy ngẫu nhiên id_nguoidung
            'id_giangvien' => Giangvien::inRandomOrder()->first()->id, // Lấy ngẫu nhiên id_giangvien
        ];
    }
}