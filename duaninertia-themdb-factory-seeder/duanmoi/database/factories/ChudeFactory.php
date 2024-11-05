<?php

namespace Database\Factories;

use App\Models\Theloai;
use App\Models\Chude;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChudeFactory extends Factory
{
    
    protected $model = Chude::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->sentence(3), // Tên chủ đề giả lập
            'hinh' => $this->faker->imageUrl(), // Hình ảnh giả lập
            'mota' => $this->faker->sentence(10), // Mô tả giả lập
            'id_theloaicon' => Theloai::whereNotNull('id_theloai')->inRandomOrder()->first()->id,
        ];
    }
}