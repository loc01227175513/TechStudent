<?php

namespace App\Http\Resources\Lecturer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GiaApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => [
                'id' => $this->id,
                'ten' => $this->ten,
                'gia' => $this->gia,
                'giamgia' => $this->giamgia,
                'hinh' => $this->hinh,
                'trangthai' => $this->trangthai,
                'id_chude' => $this->id_chude,
                'id_theloai' => $this->id_theloai,
                'id_theloaicon' => $this->id_theloaicon,
                'id_giangvien' => $this->id_giangvien,
            ],
        ];
    }
}