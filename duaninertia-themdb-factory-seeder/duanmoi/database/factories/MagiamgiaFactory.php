<?php

namespace Database\Factories;

use App\Models\Magiamgia;
use Illuminate\Database\Eloquent\Factories\Factory;

class MagiamgiaFactory extends Factory
{
    protected $model = Magiamgia::class;

    public function definition()
    {
        return [
            'maso' => $this->faker->unique()->bothify('??###'), // Mã giảm giá gồm chữ cái và số
            'giamgia' => $this->faker->numberBetween(10, 50), // Giảm giá từ 10 đến 50
            'luotsudung' => $this->faker->numberBetween(1, 100), // Số lượt sử dụng từ 1 đến 100
            'sudunghientai' => $this->faker->numberBetween(0, 100), // Số lượt sử dụng hiện tại
            'trangthai' => $this->faker->randomElement(['Chưa Duyệt', 'Đợi Duyệt', 'Đã Duyệt']), // Trạng thái
            'ngaybatdau' => $this->faker->date(), // Ngày bắt đầu
            'ngayketthuc' => $this->faker->date(), // Ngày kết thúc
            'id_giangvien' => $this->faker->numberBetween(1, 10), // Giả sử id_giangvien từ 1 đến 10
        ];
    }
}
