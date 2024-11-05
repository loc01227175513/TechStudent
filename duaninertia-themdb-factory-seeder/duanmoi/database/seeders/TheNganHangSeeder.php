<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TheNganHang;

class TheNganHangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TheNganHang::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập cho bảng thenganhang
    }
}