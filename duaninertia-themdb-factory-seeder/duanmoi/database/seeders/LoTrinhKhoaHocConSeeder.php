<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LoTrinhKhoaHocCon;
class LoTrinhKhoaHocConSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LoTrinhKhoaHocCon::factory()->count(10)->create();
    }
}
