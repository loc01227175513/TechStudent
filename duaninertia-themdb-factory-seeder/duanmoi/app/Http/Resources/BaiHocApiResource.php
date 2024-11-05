<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BaiHocApiResource extends JsonResource
{
    protected $baihoc;
    protected $khoaHoc;
    protected $video;

    public function __construct($resource, $baihoc, $khoaHoc, $video)
    {
        parent::__construct($resource);
        $this->baihoc = $baihoc;
        $this->khoaHoc = $khoaHoc;
        $this->video = $video;
    }

    /**
     * Transform the resource collection into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        // Prepare to return the lesson data
   $addedKhoaHocIds = [];
$data = [];
$countVideo = 0;
$countAllvideo = 0;
$countAllvideochuahoc = 0;
$idvideodahoc = [];

foreach ($this->baihoc as $item) {
    // Check if the video matches the lesson
    if ($this->video->id_baihoc == $item->id) {
        $data[] = ['ten bai hoc' => $item->ten];
        $countVideo++;

        // Add the corresponding course only once
        foreach ($this->khoaHoc as $khoa) {
            if ($item->id_khoahoc == $khoa->id && !in_array($khoa->id, $addedKhoaHocIds)) {
                foreach ($khoa->baihocs as $baihoc) {
                    foreach ($baihoc->video as $video) {
                        $countAllvideo++;
                        if ($video->id != $video->id_baihoc) {
                            array_push($idvideodahoc, $video->id); // Push the video ID into the array if IDs do not match
                            $countAllvideochuahoc++;
                        }
                    }
                }
                $data[] = ['giangvien' => $khoa->giangvien->nguoidung->ten . ' ' . $khoa->giangvien->nguoidung->ho];
                $data[] = ['tenkhoahoc' => $khoa->ten];
                $data[] = ['hinh' => $khoa->hinh];
                $data[] = ['gia' => $khoa->gia];
                $data[] = ['id_khoahoc' => $khoa->id];
                $addedKhoaHocIds[] = $khoa->id; // Track added course IDs
            }
        }
    }
}



        // Prepare final response array
        return [
            "videodahoc" => $this->video->id_baihoc,
            "data" => $data,
           
            'countVideo' => $countVideo,
           'video chua hoc' => $idvideodahoc,
           'countAllvideo' => $countAllvideo,
           "countAllvideochuahoc" => $countAllvideochuahoc,
           'percentageCompleted' => ($countAllvideo > 0) ? (($countAllvideo - $countAllvideochuahoc) / $countAllvideo) * 100 : 0,
        ];
    }
}