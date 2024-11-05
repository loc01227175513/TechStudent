<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VideoDaHoc;

class VideoDaHocSeeder extends Seeder
{
    public function run()
    {
        // Tạo 10 bản ghi videodahoc giả
        VideoDaHoc::factory()->count(10)->create();
    }
}