<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nguoidung;
use Faker\Factory as Faker;

class NguoidungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Nguoidung::create([
                'ten' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'dienthoai' => $faker->phoneNumber, // Generates a valid phone number string
                'hinh' => $faker->imageUrl(640, 480, 'people'),
                'matkhau' => bcrypt('password'),
                'vaitro' => $faker->randomElement([0, 1]), // Assuming 0 and 1 are valid roles
            ]);
        }
    }
}