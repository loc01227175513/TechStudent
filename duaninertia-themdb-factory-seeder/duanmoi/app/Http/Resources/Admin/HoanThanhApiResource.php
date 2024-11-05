<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HoanThanhApiResource extends JsonResource
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
            'gia' => $this->gia,
            'giamgia' => $this->giamgia,
            'hinh' => $this->hinh,
            'trangthai' => $this->trangthai,
            'mota' => $this->mota,
            'chude' => [
                'id' => $this->chude->id ?? null,
                'ten' => $this->chude->ten ?? null,
            ],
            'theloaicon' => [
                'id' => $this->theloaicon->id ?? null,
                'ten' => $this->theloaicon->ten ?? null,
            ],
            'giangvien' => [
                'id' => $this->giangvien->id ?? null,
                'ho' => $this->giangvien->nguoidung->ho ?? null,
                'ten' => $this->giangvien->nguoidung->ten ?? null,
                'email' => $this->giangvien->nguoidung->email ?? null,
            ],
           
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}