<?php

namespace App\Http\Resources\Lecturer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThemVideoApiresource extends JsonResource
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
            "ten" => $this->ten,
            "id_baihoc" => $this->id_baihoc,
            "order" => $this->order ?? 0, // Nếu order null, trả về 0
        ];
    }
}