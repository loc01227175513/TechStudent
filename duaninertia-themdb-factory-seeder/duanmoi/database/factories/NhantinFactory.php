<?php

namespace Database\Factories;

use App\Models\Nhantin;
use Illuminate\Database\Eloquent\Factories\Factory;

class NhantinFactory extends Factory
{
    protected $model = Nhantin::class;

    public function definition()
    {
        // Tạo nhiều tin nhắn giả ngẫu nhiên
        $messages = [];

        for ($i = 0; $i < rand(1, 5); $i++) { // Giả sử mỗi cuộc hội thoại có từ 1 đến 5 tin nhắn
            $messages[] = [
                'sender_id' => \App\Models\Nguoidung::inRandomOrder()->first()->id,
                'receiver_id' => \App\Models\Giangvien::inRandomOrder()->first()->id,
                'content' => $this->faker->text(rand(20, 100)), // Tạo nội dung tin nhắn ngẫu nhiên
                'timestamp' => now()->toDateTimeString(),
            ];
        }

        return [
            'noidung' => json_encode($messages), // Lưu trữ tin nhắn dưới dạng JSON
            'id_nguoidung' => \App\Models\Nguoidung::inRandomOrder()->first()->id,
            'id_giangvien' => \App\Models\Giangvien::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
