<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrinhDo;

class TrinhDoSeeder extends Seeder
{
    public function run()
    {
        // Tạo 10 bản ghi giả trong bảng trinhdo
        TrinhDo::factory()->count(10)->create();
    }
}