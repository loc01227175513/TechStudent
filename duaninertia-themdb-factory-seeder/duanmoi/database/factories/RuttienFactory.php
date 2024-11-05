<?php

namespace Database\Factories;

use App\Models\Ruttien;
use App\Models\Thenganhang;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Giangvien;

class RuttienFactory extends Factory
{
    protected $model = Ruttien::class;

    public function definition()
    {
        // Fetch existing thenganhang IDs
        $thenganhangIds = Thenganhang::pluck('id')->toArray();

        // Ensure there are thenganhang records
        if (empty($thenganhangIds)) {
            throw new \Exception('No Thenganhang records found. Please seed the Thenganhang table first.');
        }
        // Fetch existing giangvien IDs
        $giangvienIds = Giangvien::pluck('id')->toArray();

        // Ensure there are giangvien records
        if (empty($giangvienIds)) {
            throw new \Exception('No Giangvien records found. Please seed the Giangvien table first.');
        }

        return [
            'tong' => $this->faker->numberBetween(100000, 1000000), // Số tiền rút
            'id_giangvien' => $this->faker->randomElement($giangvienIds), // Valid ID giảng viên
            'id_thenganhang' => $this->faker->randomElement($thenganhangIds), // Valid ID ngân hàng
        ];
    }
}