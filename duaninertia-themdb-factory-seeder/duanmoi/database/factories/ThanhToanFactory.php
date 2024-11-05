<?php

namespace Database\Factories;

use App\Models\ThanhToan;
use App\Models\NguoiDung;
use App\Models\KhoaHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class ThanhToanFactory extends Factory
{
    protected $model = ThanhToan::class;

    public function definition()
    {
        // Fetch a random valid id_nguoidung from the nguoidung table
        $idNguoiDung = NguoiDung::inRandomOrder()->first()->id;

        // Fetch a random valid id_khoahoc from the khoahoc table
        $idKhoaHoc = KhoaHoc::inRandomOrder()->first()->id;

        return [
            'tong' => $this->faker->numberBetween(100000, 1000000), // Tổng tiền thanh toán
            'trangthai' => $this->faker->randomElement(['Đã Thanh Toán', 'Đã Hoàn Tiền']), // Trạng thái thanh toán
            'id_khoahoc' => $idKhoaHoc, // Valid ID khóa học
            'id_nguoidung' => $idNguoiDung, // Valid ID người dùng
        ];
    }
}