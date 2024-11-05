<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarkBankApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'tenthe' => $this->tenthe,
            'sothe' => $this->sothe,
            'thang' => $this->thang,
            'nam' => $this->nam,
            'mabaomat' => $this->mabaomat,
            'total' => $this->total,
        ];
    }
}