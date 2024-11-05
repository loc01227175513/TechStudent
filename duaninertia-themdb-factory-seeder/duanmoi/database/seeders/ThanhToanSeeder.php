<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ThanhToan;

class ThanhToanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ThanhToan::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập cho bảng thanhtoan
    }
}