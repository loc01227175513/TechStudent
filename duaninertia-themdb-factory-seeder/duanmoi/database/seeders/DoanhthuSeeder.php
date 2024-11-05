<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doanhthu;

class DoanhthuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Doanhthu::factory()->count(10)->create(); // Tạo 10 bản ghi doanh thu giả lập
    }
}