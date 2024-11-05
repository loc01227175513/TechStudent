<?php

namespace Database\Factories;

use App\Models\GiangVien;
use Illuminate\Database\Eloquent\Factories\Factory;

class GiangVienFactory extends Factory
{
    protected $model = GiangVien::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'dienthoai' => $this->faker->numerify('+1 (###) ###-####'), // Ensure it fits within 20 characters
            'id_nguoidung' => $this->faker->numberBetween(1, 10),
            'tieusu' => $this->faker->sentence,
            'hinh' => $this->faker->imageUrl(640, 480),
            'password' => $this->faker->password,
            'tongdoanhthu' => $this->faker->randomFloat(2, 1000, 10000000),
            'sodukhadung' => $this->faker->randomFloat(2, 1000, 10000000),
            'updated_at' => now(),
            'created_at' => now(),
        ];
    }
}