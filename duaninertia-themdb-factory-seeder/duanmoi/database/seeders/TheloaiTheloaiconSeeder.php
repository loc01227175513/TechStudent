<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TheloaiTheloaicon;

class TheloaiTheloaiconSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TheloaiTheloaicon::factory()->count(10)->create(); // Tạo 10 bản ghi giả lập
    }
}