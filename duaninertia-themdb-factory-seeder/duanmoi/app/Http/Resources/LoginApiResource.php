<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginApiResource extends JsonResource
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
            'email' => $this->email,
            'password' => $this->matkhau,
            'ten' => $this->ten,
            'hinh' => $this->hinh,
            'vaitro' => $this->vaitro,
           
        ];
    }
}