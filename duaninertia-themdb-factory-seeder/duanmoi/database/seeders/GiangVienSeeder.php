<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GiangVien;

class GiangVienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GiangVien::factory()->count(10)->create(); // Tạo 10 bản ghi giảng viên giả lập
    }
}