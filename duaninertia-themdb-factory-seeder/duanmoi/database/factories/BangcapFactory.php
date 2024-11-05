<?php

namespace Database\Factories;

use App\Models\Bangcap; // Đảm bảo bạn đã có model Bangcap
use Illuminate\Database\Eloquent\Factories\Factory;

class BangcapFactory extends Factory
{
    protected $model = Bangcap::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->sentence(3), // Tạo tên ngẫu nhiên
            'url' => $this->faker->url, // Tạo URL ngẫu nhiên
            'tochuc' => $this->faker->company, // Tạo tổ chức ngẫu nhiên
            'nam' => $this->faker->date('Y-m-d'), // Tạo năm ngẫu nhiên
            'id_giangvien' => \App\Models\Giangvien::factory(), // Giả định bạn có factory cho Giangvien
        ];
    }
}