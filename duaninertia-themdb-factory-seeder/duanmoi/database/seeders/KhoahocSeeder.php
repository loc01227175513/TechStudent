<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Khoahoc;

class KhoahocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        Khoahoc::factory()->count(10)->create();
    }
}