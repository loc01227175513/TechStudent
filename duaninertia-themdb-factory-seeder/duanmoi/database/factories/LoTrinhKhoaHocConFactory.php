<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\LoTrinhKhoaHocCon;
use App\Models\LoTrinhKhoaHoc;
use App\Models\KhoaHoc;


class LoTrinhKhoaHocConFactory extends Factory
{
    protected $model = LoTrinhKhoaHocCon::class;

    public function definition(): array
    {
        return [
            "id_lotrinhkhoahoc" => LoTrinhKhoaHoc::inRandomOrder()->first()->id,
            "id_khoahoc" => KhoaHoc::inRandomOrder()->first()->id,
        ];
    }
}