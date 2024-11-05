<?php

namespace App\Http\Resources\Lecturer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowKhoahocApiResource extends JsonResource
{
    protected $MangXaHoi;

    public function __construct($resource, $MangXaHoi = null)
    {
        parent::__construct($resource);
        $this->MangXaHoi = $MangXaHoi;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $baihocArray = $this->baihocs ? $this->baihocs->map(function ($baihoc) {
            return [
                "id" => $baihoc->id,
                "ten" => $baihoc->ten,
                "id_khoahoc" => $baihoc->id_khoahoc,
                "mota" => $baihoc->mota,
                "created_at" => $baihoc->created_at,
                "updated_at" => $baihoc->updated_at,
            ];
        })->toArray() : null;

        return [
            'id' => $this->id,
            'ten' => $this->ten,
            'gia' => $this->gia,
            'giamgia' => $this->giamgia,
            'hinh' => $this->hinh,
            'trangthai' => $this->trangthai,
            'id_chude' => $this->id_chude,
            'id_giangvien' => $this->id_giangvien,
            'danhgia' => $this->danhgia,
            'theLoai' => $this->theloai,
            'theLoaiCon' => $this->theloaicon,
            'chuDe' => $this->chude,
            'giangVien' => $this->giangvien,
            'baihoc' => $baihocArray,
            'ThanhToan' => $this->ThanhToan,
            'MangXaHoi' => $this->MangXaHoi,
            'created_at' => $this->created_at,
        ];
    }
}