<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Magiamgiakhoahoc;
use App\Models\Khoahoc;

class MagiamgiakhoahocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure related records exist in magiamgia table
        \App\Models\Magiamgia::factory()->count(10)->create();

        // Ensure related records exist in khoahoc table
        Khoahoc::factory()->count(10)->create();

        // Tạo 10 bản ghi giả lập cho bảng magiamgiakhoahoc
        Magiamgiakhoahoc::factory()->count(10)->create();
    }
}