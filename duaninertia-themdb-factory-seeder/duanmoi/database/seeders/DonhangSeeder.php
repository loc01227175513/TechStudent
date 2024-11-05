<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Donhang;

class DonhangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Donhang::factory()->count(10)->create(); // Tạo 10 bản ghi đơn hàng giả lập
    }
}