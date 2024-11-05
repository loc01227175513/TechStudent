<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class APIbaihoc extends JsonResource
{
    protected $baihoc1;
    protected $video;
    protected $videodahoc1;
    protected $videoAll;

    public function __construct($resource, $baihoc1 = [], $video = [], $videodahoc1 = [], $videoAll = [])
    {
        parent::__construct($resource);
        $this->baihoc1 = is_array($baihoc1) || is_object($baihoc1) ? $baihoc1 : [];
        $this->video = is_array($video) || is_object($video) ? $video : [];
        $this->videoAll = is_array($videoAll) || is_object($videoAll) ? $videoAll : [];
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $baihoc1 = [];
        $video = [];
        $idkhac = [];
        $TongVideoIDCuatungBaiHoc = [];

        if (is_array($this->baihoc1) || is_object($this->baihoc1)) {
            foreach ($this->baihoc1 as $baihoc) {
                if ($baihoc->id_khoahoc == $this->id) {
                    $baihoc1[$baihoc->id] = $baihoc->toArray($request);

                    if (is_array($this->video) || is_object($this->video)) {
                        foreach ($this->video as $vid) {
                            if ($vid->id_baihoc === $baihoc->id) {
                                $baihoc1[$baihoc->id]['video'][] = $vid->toArray($request);
                                // Add video id to TongVideoIDCuatungBaiHoc for the current baihoc
                                if (!isset($TongVideoIDCuatungBaiHoc[$baihoc->id])) {
                                    $TongVideoIDCuatungBaiHoc[$baihoc->id] = [];
                                }
                                $TongVideoIDCuatungBaiHoc[$baihoc->id][] = $vid->id;
                            }
                        }
                    }

                    if (is_array($this->videoAll) || is_object($this->videoAll)) {
                        foreach ($this->videoAll as $vidAll) {
                            if ($vidAll->id_baihoc === $baihoc->id) {
                                $found = false;
                                if (is_array($this->video) || is_object($this->video)) {
                                    foreach ($this->video as $vid) {
                                        if ($vid->id === $vidAll->id) {
                                            $found = true;
                                            break;
                                        }
                                    }
                                }
                                if (!$found) {
                                    $idkhac[$baihoc->id][] = $vidAll->id;
                                }
                            }
                        }
                    }
                }
            }
        }

        return [
            'id' => $this->id,
            'ten' => $this->ten,
            'gia' => $this->gia,
            'giamgia' => $this->giamgia,
            'hinh' => $this->hinh,
            'trangthai' => $this->trangthai,
            'id_chude' => $this->id_chude,
            'chude' => $this->chude->ten,
            'id_giangvien' => $this->id_giangvien,
            'giangvien' => $this->giangvien->ten,   
            'baihoc1' => $baihoc1, // Include baihoc1 data here
            'video' => $video, // Include video data here
            'TongVideoIDCuatungBaiHoc' => $TongVideoIDCuatungBaiHoc, // Include TongVideoIDCuatungBaiHoc data here
            'idkhac' => $idkhac, 
            'TongTongVideoIDCuatungBaiHoc%' => count($TongVideoIDCuatungBaiHoc),
            'idkhac%' => count($idkhac),
            'TongTongHoanthanh' => count($TongVideoIDCuatungBaiHoc) + count($idkhac),
            'TongTongHoanthanhphantram' => count($TongVideoIDCuatungBaiHoc) + count($idkhac) > 0 ? (count($TongVideoIDCuatungBaiHoc) / (count($TongVideoIDCuatungBaiHoc) + count($idkhac))) * 100 : 0,
            
        ];
    }
} 