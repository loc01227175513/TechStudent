<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Baihoc;

class BaihocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo 10 bản ghi trong bảng baihoc
        Baihoc::factory(10)->create();
    }
}