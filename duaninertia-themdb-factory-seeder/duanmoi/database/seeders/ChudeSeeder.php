<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chude;


class ChudeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Chude::factory()->count(10)->create(); // Tạo 10 bản ghi chi tiết đơn hàng giả lập
    }
}