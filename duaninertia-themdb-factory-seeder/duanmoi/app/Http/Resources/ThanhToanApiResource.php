<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThanhToanApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "total" => $this->total,
            "id_nguoidung" => $this->id_nguoidung,
            "id_khoahoc" => $this->id_khoahoc,
            "id_giohang" => $this->id_giohang,
            "khoaHoc" => $this->khoahocs,
            "nguoidung" => $this->nguoidungs,
            "updated_at" => $this->updated_at,
        ];
    }
}