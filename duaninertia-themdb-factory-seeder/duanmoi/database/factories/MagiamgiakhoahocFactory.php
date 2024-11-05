<?php

namespace Database\Factories;

use App\Models\Magiamgiakhoahoc;
use App\Models\Magiamgia; // Ensure you have this model
use Illuminate\Database\Eloquent\Factories\Factory;

class MagiamgiakhoahocFactory extends Factory
{
    protected $model = Magiamgiakhoahoc::class;

    public function definition()
    {
        // Ensure there are enough records in the magiamgia table
        if (Magiamgia::count() < 20) {
            Magiamgia::factory()->count(20 - Magiamgia::count())->create();
        }

        return [
            'id_khoahoc' => $this->faker->numberBetween(1, 50), // Giả sử id_khoahoc từ 1 đến 50
            'id_magiamgia' => Magiamgia::inRandomOrder()->first()->id, // Ensure id_magiamgia exists
        ];
    }
}