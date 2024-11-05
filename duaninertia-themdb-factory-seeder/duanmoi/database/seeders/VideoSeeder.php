<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run()
    {
        // Tạo 10 video giả
        Video::factory()->count(10)->create();
    }
}