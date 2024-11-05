<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Magiamgia;

class MagiamgiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Magiamgia::factory()->count(10)->create(); // Tạo 10 bản ghi mã giảm giá giả lập
    }
}