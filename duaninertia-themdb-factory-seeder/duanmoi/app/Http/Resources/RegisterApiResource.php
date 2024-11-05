<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegisterApiResource extends JsonResource
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
            "ho" => $this->ho,
            "ten" => $this->ten,
            "tentaikhoan" => $this->tentaikhoan,
            "email" => $this->email,
            "dienthoai" => $this->dienthoai,
            "hinh" => $this->hinh,
            "tieusu" => $this->tieusu,
            "matkhau" => $this->matkhau,
            "vaitro" => $this->vaitro,
        ];
    }
}