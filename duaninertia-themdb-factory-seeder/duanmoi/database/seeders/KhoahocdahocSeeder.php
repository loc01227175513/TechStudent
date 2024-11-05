<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Khoahocdahoc;

class KhoahocdahocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Khoahocdahoc::factory()->count(10)->create(); // Tạo 10 bản ghi khóa học đã học giả lập
    }
}
