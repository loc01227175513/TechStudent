<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nhantin;

class NhantinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Nhantin::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập cho bảng nhantin
    }
}