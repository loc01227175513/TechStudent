<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GioHang;

class GioHangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GioHang::factory()->count(10)->create(); // Tạo 10 bản ghi giỏ hàng giả lập
    }
}