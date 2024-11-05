<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Danhgia;

class DanhgiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Danhgia::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập
    }
}