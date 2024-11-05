<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Banner;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Banner>
 */
class BannerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Banner::class;
    public function definition(): array
    {
        return [
            'tieude' => $this->faker->sentence,
            'hinh' => $this->faker->imageUrl,
            'mota' => $this->faker->paragraph,
            'trangthai' => $this->faker->randomElement([1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), // 90% là 1, 10% là 0
        ];
    }
}