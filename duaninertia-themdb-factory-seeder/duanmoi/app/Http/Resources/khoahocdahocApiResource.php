<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class khoahocdahocApiResource extends JsonResource
{
    protected $baihoc;
    protected $thanhtoan;
        

    public function __construct($resource, $baihoc = null, $thanhtoan = null)
    {
        parent::__construct($resource);
        $this->baihoc = $baihoc;
        $this-> thanhtoan = $thanhtoan;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'trangthai' => $this->trangthai,
            'id_khoahoc' => $this->id_khoahoc,
            'id_nguoidung' => $this->id_nguoidung,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'khoahoc' => [
                'id' => $this->khoahoc->id,
                'ten' => $this->khoahoc->ten,
                'gia' => $this->khoahoc->gia,
                'giamgia' => $this->khoahoc->giamgia,
                'mota' => $this->khoahoc->mota,
                'hinh' => $this->khoahoc->hinh,
                'dieukien' => $this->khoahoc->dieukien,
                'muctieu' => $this->khoahoc->muctieu,
                'trangthai' => $this->khoahoc->trangthai,
                'id_chude' => $this->khoahoc->id_chude,
                'chude' => $this->khoahoc->chude->ten,
                'id_theloaicon' => $this->khoahoc->id_theloaicon,
                'id_theloai' => $this->khoahoc->id_theloai,
                'id_giangvien' => $this->khoahoc->id_giangvien,
                'created_at' => $this->khoahoc->created_at,
                'updated_at' => $this->khoahoc->updated_at,
            ],
            'nguoidung' => [
                'id' => $this->nguoidung->id,
                'ten' => $this->nguoidung->ten,
                'email' => $this->nguoidung->email,
                'dienthoai' => $this->nguoidung->dienthoai,
                'hinh' => $this->nguoidung->hinh,
                'matkhau' => $this->nguoidung->matkhau,
                'vaitro' => $this->nguoidung->vaitro,
                'created_at' => $this->nguoidung->created_at,
                'updated_at' => $this->nguoidung->updated_at,
            ],
            'baihoc' => $this->baihoc ? $this->baihoc->toArray() : null,
            'soluongmua' => $this->thanhtoan ? $this-> thanhtoan->toArray() : null,
        ];
    }
}