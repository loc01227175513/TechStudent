<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mangxahoi;

class MangxahoiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Mangxahoi::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập cho bảng mangxahoi
    }
}