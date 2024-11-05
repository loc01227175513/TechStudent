<?php

namespace Database\Factories;

use App\Models\Baihoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class BaihocFactory extends Factory
{
    protected $model = Baihoc::class;

    public function definition(): array
    {
        return [
            'ten' => $this->faker->sentence, // Tên bài học ngẫu nhiên
            'id_khoahoc' => \App\Models\Khoahoc::factory(), // Giả sử đã có factory cho Khoahoc
            'order' => $this->faker->numberBetween(1, 100),
            'mota' => $this->faker->text(100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}