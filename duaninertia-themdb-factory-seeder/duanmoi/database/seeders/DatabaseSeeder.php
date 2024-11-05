<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call(NguoidungSeeder::class);
        $this->call(TheloaiSeeder::class);
        $this->call(TheloaiTheloaiconSeeder::class);

        $this->call(GiangVienSeeder::class);
        $this->call(ChudeSeeder::class);
        $this->call(KhoahocSeeder::class);  
        $this->call(ChungchiSeeder::class);
        $this->call(ChungchiNguoiDungSeeder::class);
        $this->call(BaihocSeeder::class);
        $this->call(VideoSeeder::class);
        $this->call(VideoDaHocSeeder::class);
        $this->call(KhoahocdahocSeeder::class);

        $this->call(DanhgiaSeeder::class);
        $this->call(DoanhthuSeeder::class);
        $this->call(DonhangSeeder::class);
        $this->call(DonhangChitietSeeder::class);
        $this->call(GioHangSeeder::class);
        $this->call(MagiamgiaSeeder::class);
        $this->call(MagiamgiakhoahocSeeder::class);
        $this->call(NguoidungmagiamgiaSeeder::class);
        $this->call(NhantinSeeder::class);

        $this->call(TheNganHangSeeder::class);
        $this->call(RuttienSeeder::class);
        $this->call(SoluongDangKySeeder::class);
        $this->call(ThanhToanSeeder::class);

        $this->call(TrinhDoSeeder::class);
        $this->call(BangcapSeeder::class);
        $this->call(MangxahoiSeeder::class);
        $this->call(BannerSeeder::class);
        $this->call(LoTrinhKhoaHocSeeder::class);
        $this->call(LoTrinhKhoaHocConSeeder::class);

    }
}
