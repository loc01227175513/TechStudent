<?php

namespace App\Http\Resources\Lecturer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThemKhoaHocApiResource extends JsonResource
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
            'ten' => $this->ten,
            'trangthai' => $this->trangthai,
            'id_giangvien' => $this->id_giangvien,
            'gia' => $this->gia,
            'giamgia' => $this->giamgia,
            'hinh' => $this->hinh,
            'id_chude' => $this->id_chude,
        ];
    }
}