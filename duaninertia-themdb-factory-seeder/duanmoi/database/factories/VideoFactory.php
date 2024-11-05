<?php

namespace Database\Factories;

use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoFactory extends Factory
{
    protected $model = Video::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->sentence(3),
            'thoiluong' => $this->faker->time($format = 'H:i:s', $max = '02:00:00'),
            'id_baihoc' => \App\Models\BaiHoc::factory(),
            'mota' => $this->faker->sentence(),
            'url_link' => 'https://www.example.com/video/' . $this->faker->unique()->randomNumber(), // Generating a sample URL
            'order' => $this->faker->numberBetween(1, 10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}