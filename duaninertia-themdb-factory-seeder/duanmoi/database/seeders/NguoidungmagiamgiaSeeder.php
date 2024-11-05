<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nguoidung;
use App\Models\Magiamgia;
use App\Models\Nguoidungmagiamgia;

class NguoidungmagiamgiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure there are users and discount codes to reference
        $users = Nguoidung::factory()->count(10)->create();
        $discounts = Magiamgia::factory()->count(10)->create();

        // Create 10 records in nguoidungmagiamgia table
        foreach ($users as $user) {
            Nguoidungmagiamgia::factory()->create([
                'id_nguoidung' => $user->id,
                'id_magiamgia' => $discounts->random()->id,
            ]);
        }
    }
}