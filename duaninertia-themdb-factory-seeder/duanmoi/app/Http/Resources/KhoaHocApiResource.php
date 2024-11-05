<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KhoaHocApiResource extends JsonResource
{
    protected $danhgia;
    protected $video;
    protected $trinhdo;  // Add the trinhdo property

    public function __construct($resource, $danhgia, $video, $trinhdo)
    {
        parent::__construct($resource);
        $this->danhgia = $danhgia;
        $this->video = $video;
        $this->trinhdo = $trinhdo;  // Initialize the trinhdo property
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
            'ten' => $this->ten,
            'gia' => $this->gia,
            'soluong' => $this->soluong,
            'trangthai' => $this->trangthai,
            'id_giangvien' => $this->id_giangvien,
            'hinh' => $this->hinh,
            'giangvien' => $this->giangvien->nguoidung->ho . ' ' . $this->giangvien->nguoidung->ten,
            'danhgia' => $this->danhgia,
            'video' => $this->video->map(function ($video) {
                return [
                    'id' => $video->id,
                    'ten' => $video->ten,
                    'link' => $video->link,
                    'thoiluong' => $video->thoiluong,
                ];
            }),
            'trinhdo' => $this->trinhdo ? $this->trinhdo->ten : null
             
        ];
    }
}