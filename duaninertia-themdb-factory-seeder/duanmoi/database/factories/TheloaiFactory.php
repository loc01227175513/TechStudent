<?php

namespace Database\Factories;

use App\Models\Theloai;
use Illuminate\Database\Eloquent\Factories\Factory;

class TheloaiFactory extends Factory
{
    protected $model = Theloai::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->word,
            'hinh' => $this->faker->imageUrl(),
        ];
    }
}