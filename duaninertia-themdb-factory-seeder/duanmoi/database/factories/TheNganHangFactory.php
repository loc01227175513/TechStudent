<?php

namespace Database\Factories;

use App\Models\TheNganHang;
use Illuminate\Database\Eloquent\Factories\Factory;

class TheNganHangFactory extends Factory
{
    protected $model = TheNganHang::class;

    public function definition()
    {
        return [
            'tenthe' => $this->faker->company, // Tên thẻ
            'sothe' => $this->faker->bankAccountNumber, // Số thẻ
            'thang' => $this->faker->numberBetween(1, 12), // Tháng
            'nam' => $this->faker->numberBetween(2023, 2030), // Năm
            'mabaomat' => $this->faker->numberBetween(100, 999), // Mã bảo mật
            'tien' => $this->faker->numberBetween(1000000, 10000000), // Số tiền
            
        ];
    }
}