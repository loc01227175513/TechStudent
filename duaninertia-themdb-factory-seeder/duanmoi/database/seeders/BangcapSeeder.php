<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bangcap;

class BangcapSeeder extends Seeder
{
    public function run()
    {
        Bangcap::factory()->count(50)->create(); // Tạo 50 bản ghi ngẫu nhiên
    }
}
