<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chungchi;
use App\Models\Khoahoc;

class ChungchiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure there are Khoahoc records to reference
        Chungchi::factory()->count(10)->create();
        
    }
}
