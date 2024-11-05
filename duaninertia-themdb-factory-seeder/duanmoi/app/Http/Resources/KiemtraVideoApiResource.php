<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KiemtraVideoApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "trangthai" => $this->trangthai,
            "id_video" => $this->id_video,
            "id_nguoidung" => $this->id_nguoidung,
        ];
    }
}