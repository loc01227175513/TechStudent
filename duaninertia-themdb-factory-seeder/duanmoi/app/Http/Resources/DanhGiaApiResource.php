<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DanhGiaApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'noi_dung' => $this->binhluan, // Corrected from binhluan to noidung
            'so_sao' => $this->danhgia,
            'nguoi_danh_gia' => $this->nguoidung, // Corrected from id_khoahoc to id_nguoidung
            'ngay_danh_gia' => $this->created_at, // Assuming created_at is the date of the review
        ];
    }
}