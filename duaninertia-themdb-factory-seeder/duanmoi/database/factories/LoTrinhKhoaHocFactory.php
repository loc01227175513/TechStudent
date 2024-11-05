<?php

namespace Database\Factories;

use App\Models\LoTrinhKhoaHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class LoTrinhKhoaHocFactory extends Factory
{
    protected $model = LoTrinhKhoaHoc::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->sentence(3),
            'mota' => $this->faker->paragraph,
            'hinh' => $this->faker->imageUrl(640, 480, 'education', true),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}