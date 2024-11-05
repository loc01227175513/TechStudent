<?php

namespace Database\Factories;

use App\Models\SoluongDangKy;
use App\Models\Giangvien;
use App\Models\Khoahoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class SoluongDangKyFactory extends Factory
{
    protected $model = SoluongDangKy::class;

    public function definition()
    {
        // Fetch existing giangvien IDs
        $giangvienIds = Giangvien::pluck('id')->toArray();

        // Fetch existing khoahoc IDs
        $khoahocIds = Khoahoc::pluck('id')->toArray();

        return [
            'soluong' => $this->faker->numberBetween(1, 100), // Số lượng đăng ký
            'id_khoahoc' => $this->faker->randomElement($khoahocIds), // Valid ID khóa học
            'id_giangvien' => $this->faker->randomElement($giangvienIds), // Valid ID giảng viên
        ];
    }
}
