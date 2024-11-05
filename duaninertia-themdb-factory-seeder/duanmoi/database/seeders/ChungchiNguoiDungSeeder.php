<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChungChiNguoiDung;

class ChungchiNguoiDungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there are Chungchi records to reference
        ChungChiNguoiDung::factory()->count(10)->create();
    }
}