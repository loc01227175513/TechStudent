<?php

namespace Database\Factories;

use App\Models\TrinhDo;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrinhDoFactory extends Factory
{
    protected $model = TrinhDo::class;

    public function definition()
    {
        return [
            'ten' => $this->faker->randomElement(['Trình độ sơ cấp', 'Trình độ trung cấp', 'Cấp độ chuyên gia', 'Tất cả các cấp độ']),
            'id_giangvien' => \App\Models\GiangVien::factory(),
            'id_khoahoc' => \App\Models\KhoaHoc::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}