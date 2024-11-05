<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowGioHang extends JsonResource
{
    protected $khoahocs;
    protected $nguoidungs;
    protected $giangviens;
    protected $all_users;
    protected $danhgia;

    public function __construct($resource, $khoahocs, $nguoidungs, $giangviens, $all_users, $danhgia)
    {
        parent::__construct($resource);
        $this->khoahocs = $khoahocs;
        $this->nguoidungs = $nguoidungs;
        $this->giangviens = $giangviens;
        $this->all_users = $all_users;
        $this->danhgia = $danhgia;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $khoahocsArray = $this->khoahocs->map(function ($khoahoc) {
            $giangvien = $this->giangviens->firstWhere('id', $khoahoc->id_giangvien);
            $nguoidung = $this->all_users->firstWhere('id', $giangvien->id_nguoidung);
            $tenGiangVien = $nguoidung ? $nguoidung->ten : null;

            // Lấy các bình luận liên quan đến khóa học
            $danhgia = $this->danhgia->where('id_khoahoc', $khoahoc->id)->map(function ($danhgia) {
                return $danhgia->toArray();
            })->all();

            return array_merge($khoahoc->toArray(), [
                'tenGiangVien' => $tenGiangVien,
                'danhgia' => $danhgia
            ]);
        })->all();

        return [
            'id' => $this->id,
            'khoahocs' => $khoahocsArray,
            'nguoidungs' => $this->nguoidungs->map->toArray()->all(),
            // 'giangviens' => $this->giangviens->map->toArray()->all(),
            // 'all_users' => $this->all_users->toArray(),
        ];
    }
}