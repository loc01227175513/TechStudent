<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theloai;

class TheloaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create 10 Theloai records
        Theloai::factory()->count(10)->create();
    }
}