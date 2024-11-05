<?php

namespace Database\Factories;

use App\Models\Chungchi;

use App\Models\Khoahoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChungchiFactory extends Factory
{
    protected $model = Chungchi::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->sentence(3), // Tên chứng chỉ giả lập
            'phathanhboi' => $this->faker->company, // Phát hành bởi công ty giả lập
            'hieuluc' => $this->faker->date, // Hiệu lực giả lập
            'giaychungnhan' => $this->faker->imageUrl(), // Giấy chứng nhận giả lập (hình ảnh)
            'id_khoahoc' => Khoahoc::all()->random()->id,
             'loai' => $this->faker->randomElement(['landscape', 'portrait']), // Loại giả lập
        ];
    }

}
