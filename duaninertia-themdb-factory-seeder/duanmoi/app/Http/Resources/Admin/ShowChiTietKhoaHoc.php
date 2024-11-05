<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowChiTietKhoaHoc extends JsonResource
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
            'mota' => $this->mota,
            'hinh' => $this->hinh,
            'dieukien' => $this->dieukien,
            'muctieu' => $this->muctieu,
            'trangthai' => $this->trangthai,
            'baihocs' => $this->baihocs,
            'giangvien' => $this->giangvien,
            'id_chude' => $this->id_chude,
            'id_theloaicon' => $this->id_theloaicon,
            'id_theloai' => $this->id_theloai,
            'id_giangvien' => $this->id_giangvien,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}