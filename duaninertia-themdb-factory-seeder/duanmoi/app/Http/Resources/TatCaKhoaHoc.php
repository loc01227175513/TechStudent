<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TatCaKhoaHoc extends JsonResource
{
    protected $dangky;
    protected $baihocs;

    public function __construct($resource, $dangky = null, $baihocs = null)
    {
        parent::__construct($resource);
        $this->dangky = collect($dangky); // Ensure $dangky is a collection
        $this->baihocs = collect($baihocs); // Ensure $baihocs is a collection
    }

    /** 
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        // Filter dangky to include only those that match the course ID
        $filteredDangky = $this->dangky->filter(function ($registration) {
            return $registration->id_khoahoc == $this->id;
        });

        return [
            "id" => $this->id,
            "ten" => $this->ten ?? 'N/A',
            "hinh" => $this->hinh ?? 'N/A',
            "gia" => $this->gia ?? 0,
            "giamgia" => $this->giamgia ?? 0,
            'id_chude' => $this->id_chude ?? 0,
            "chude" => $this->chude->ten ?? 'N/A',
            'id_theloaicon' => $this->id_theloaicon ?? 0,
            'id_giangvien' => $this->id_giangvien ?? 0,
            'id_theloai' => $this->id_theloai ?? 0,
            "theloai" => $this->theloaicon->ten ?? 'N/A',
            "giangvien" => $this->giangvien->ten ?? 'N/A',
            'mota' => $this->mota ?? 'N/A',
            'danhgia' => $this->danhgia ?? 0,
            "dangky" => $filteredDangky->count(),
            "baihocs" => $this->baihocs->count(),
            "trangthai" => $this->trangthai,
            "created_at" => $this->created_at,
        ];
        // return parent::toArray($request) + [
        //     "dangky" => $filteredDangky->count(),
        //     "baihocs" => $this->baihocs->count(),
        // ];
    }
}