<?php

namespace App\Http\Resources\Lecturer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrangDichApiResource extends JsonResource
{
    protected $trinhdo;

    public function __construct($resource, $trinhdo)
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
            'data' => [
                'id' => $this->id,
                'ten' => $this->ten,
                'mota' => $this->mota,
                'gia' => $this->gia ?? 0, 
                'giamgia' => $this->giamgia ?? 0, 
                'hinh' => $this->hinh,
                'trangthai' => $this->trangthai ?? 'Notyet', 
                'id_chude' => $this->id_chude,
                'id_theloai' => $this->id_theloai,
                'id_theloaicon' => $this->id_theloaicon,
                'id_giangvien' => $this->id_giangvien,
                'trinhdo' => $this->trinhdo,
            ],
        ];
    }
}