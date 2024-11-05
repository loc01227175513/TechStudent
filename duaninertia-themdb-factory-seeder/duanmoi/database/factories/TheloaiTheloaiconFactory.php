<?php

namespace Database\Factories;

use App\Models\Theloai;
use App\Models\TheloaiTheloaicon;
use Illuminate\Database\Eloquent\Factories\Factory;

class TheloaiTheloaiconFactory extends Factory
{
    protected $model = TheloaiTheloaicon::class;

    public function definition()
    {
        // Determine if this is a Theloai or Theloaicon record
        $isTheloai = $this->faker->boolean;

        return [
            'ten' => $this->faker->word,
            'hinh' => $this->faker->imageUrl(),
            'id_theloai' => $isTheloai ? null : Theloai::factory()->create()->id, // id_theloai is null for Theloai, or the ID of a newly created Theloai record for Theloaicon
        ];
    }
}