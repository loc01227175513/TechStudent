<?php

namespace App\Http\Resources\Lecturer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MoTaApiResource extends JsonResource
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
            "muctieu" => $this->muctieu,
            "mota" => $this->mota,
            "id_khoahoc" => $this->id,
        ];
    }
}