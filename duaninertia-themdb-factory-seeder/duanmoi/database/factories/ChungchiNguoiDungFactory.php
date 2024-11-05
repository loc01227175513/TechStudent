<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\NguoiDung;
use App\Models\ChungChiNguoiDung;
use App\Models\Khoahoc;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chungchi>
 */
class ChungchiNguoiDungFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ChungChiNguoiDung::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $chungchi = ChungChiNguoiDung::where('id_nguoidung', null)->inRandomOrder()->first();

        return [
            'id_khoahoc' => $chungchi ? $chungchi->id_khoahoc : Khoahoc::inRandomOrder()->first()->id,
            'id_nguoidung' => NguoiDung::inRandomOrder()->first()->id,
        ];
    }
}
