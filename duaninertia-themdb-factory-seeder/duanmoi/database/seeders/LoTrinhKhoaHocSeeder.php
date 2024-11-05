<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LoTrinhKhoaHoc;
class LoTrinhKhoaHocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LoTrinhKhoaHoc::factory()->count(10)->create();
    }
}
