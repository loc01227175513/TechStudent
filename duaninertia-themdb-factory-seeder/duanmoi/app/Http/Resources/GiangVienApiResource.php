<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GiangVienApiResource extends JsonResource
{   
    protected $trinhdo;
    public function __construct($resource,$trinhdo)
    {
        parent::__construct($resource);
        $this->trinhdo = $trinhdo;
    }
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
            "email" =>$this->email,
            "dienthoai" => $this->dienthoai,
            "id_nguoidung" => $this->id_nguoidung,
            "password" => $this->password,
            "tieusu" =>$this->tieusu,
            "hinh" => $this->hinh,
            "tongdoanhthu" => $this->tongdoanhthu,
            "sodukhadung" => $this->sodukhadung,
            "trinhdo" => $this->trinhdo ? [
                "id" => $this->trinhdo->id,
                "ten" => $this->trinhdo->ten,
                'id_giangvien' => $this->trinhdo->id_giangvien,
                'id_khoahoc' => $this->trinhdo->id_khoahoc,
                'created_at' => $this->trinhdo->created_at,
            ] : null,
            "created_at" => $this->created_at,
            "updated_at" =>$this->updated_at,
        ];
    }
}
