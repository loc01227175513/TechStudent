<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ruttien;

class RuttienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ruttien::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập cho bảng ruttien
    }
}