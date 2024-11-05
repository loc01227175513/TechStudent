<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SoluongDangKy;

class SoluongDangKySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SoluongDangKy::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập cho bảng soluongdangky
    }
}