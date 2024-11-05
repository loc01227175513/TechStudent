<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

use App\Http\Resources\ApiResource;
use App\Http\Resources\TatCaKhoaHoc;
use App\Http\Resources\GiangVienApiResource;
use App\Http\Resources\KhoaHocApiResource;
use App\Http\Resources\RegisterApiResource;
use App\Http\Resources\LoginApiResource;
use App\Http\Resources\KhoaHocChiTietApi;
use App\Http\Resources\ChuyenDoiApiResorce;
use App\Http\Resources\AddcartAPI;
use App\Http\Resources\ChuDeApiResource;
use App\Http\Resources\ShowGioHang;
use App\Http\Resources\ThanhToanApiResource;
use App\Http\Resources\CarkBankApiResource;
use App\Http\Resources\DangKyApiResource;
use App\Http\Resources\VideoDaHocApiResource;
use App\Http\Resources\KiemtraVideoApiResource;
use App\Http\Resources\BaiHocApiResource;
use App\Http\Resources\APIbaihoc;
use App\Http\Resources\DanhGiaApiResource;
use App\Http\Resources\khoahocdahocApiResource;
use App\Http\Resources\NguoiDungApiResource;
use App\Http\Resources\Admin\Showbanner;
use App\Http\Resources\LichSuApiResource;
use App\Http\Resources\DonHangChiTietApiResource;
use App\Http\Resources\KhoaHocBanDuocGiangVien;
use App\Http\Resources\ChungChiApiResource;
use App\Http\Resources\ChungChiApi;
use App\Http\Resources\MangXaHoiApiResource;


use App\Http\Resources\Lecturer\ThemKhoaHocApiResource;
use App\Http\Resources\Lecturer\GiangVienApiResourc;
use App\Http\Resources\Lecturer\ShowKhoahocApiResource;
use App\Http\Resources\Lecturer\MoTaApiResource;
use App\Http\Resources\Lecturer\ThemBaiHocApiresource;
use App\Http\Resources\Lecturer\ThemVideoApiresource;
use App\Http\Resources\Lecturer\TrangDichApiResource;
use App\Http\Resources\Lecturer\GiaApiResource;



//Auth
use App\Models\BaiHoc;
use App\Models\GiangVien;
use App\Models\ChuDe;
use App\Models\KhoaHoc;
use App\Models\MoTa;
use App\Models\NguoiDung;
use App\Models\TheLoai;
use App\Models\GioHang;
use App\Models\DanhGia;
use App\Models\MoTaHoc;
use App\Models\DoanhThu;
use App\Models\TheNganHang;
use App\Models\DangKy;
use App\Models\VideoDaHoc;
use App\Models\Video;
use App\Models\TrinhDo;
use App\Models\TheLoaiCon;
use App\Models\donhang;
use App\Models\donhangchitiet;
use App\Models\ThanhToan;
use App\Models\SoLuongDangKy;
use App\Models\KhoaHocDaHoc;
use App\Models\Banner;
use App\Models\Chungchi;
use App\Models\ChungChiNguoiDung;
use App\Models\MangXaHoi;
use App\Models\LoTrinhKhoaHoc;
use App\Models\LoTrinhKhoaHocCon;
use App\Models\Magiamgia;
use App\Models\Magiamgiakhoahoc;
use App\Models\Nguoidungmagiamgia;
use App\Models\TheoDoi;
use App\Models\YeuThich;
use App\Models\Nhantin;







Route::get("/allkhoahoc", function () {
    $khoahocCollection = KhoaHoc::with(['giangvien.nguoidung', 'chude', 'theloaicon','danhgia'])
        ->where('trangthai', 'active')
        ->get();

    // Fetch dangky and baihocs data for each khoahoc
    $khoahocCollection->each(function ($khoahoc) {
        $khoahoc->dangky = ThanhToan::where('id_khoahoc', $khoahoc->id)->get();
        $khoahoc->baihocs = BaiHoc::where('id_khoahoc', $khoahoc->id)->get();
    });

    return TatCaKhoaHoc::collection($khoahocCollection->map(function ($khoahoc) {
        return new TatCaKhoaHoc($khoahoc, $khoahoc->dangky, $khoahoc->baihocs);
    }));
});

Route::get('/theloai', function () {
    $results = TheLoai::with(['theloaicons.chudes', 'chudes'])
        ->whereHas('theloaicons')
        ->get();
    return ApiResource::collection($results);
});


Route::get('chude', function () {
    $chude = ChuDe::get();
    return ChuDeApiResource::collection($chude);
});

Route::get('KhoahocChude/{id}', function ($id) {
    // Fetch the topic with its related courses and instructors
    $results = ChuDe::with(['khoahocs.giangvien'])->find($id);

    if ($results) {
        $khoahocs = $results->khoahocs->map(function ($khoahoc) {
            // Fetch ratings for the course
            $danhgia = DanhGia::where('id_khoahoc', $khoahoc->id)->get();

            // Fetch lessons for the course
            $baihoc = BaiHoc::where('id_khoahoc', $khoahoc->id)->get();

            // Extract the IDs of the lessons
            $baihocIds = $baihoc->pluck('id')->toArray();

            // Fetch videos related to the lessons
            $video = Video::whereIn('id_baihoc', $baihocIds)->get();
            $trinhdo = TrinhDo::where('id_khoahoc', $khoahoc->id)->first();

            // Return the course resource with ratings and videos
            return new KhoaHocApiResource($khoahoc, $danhgia, $video, $trinhdo);
        });

        return response()->json($khoahocs);
    }

    return response()->json([], 404);
});
Route::get('Khoahoctheloai/{id}', function ($id) {
    // Fetch the topic with its related courses and instructors
    $results = TheLoai::with(['khoahocs.giangvien'])->find($id);

    if ($results) {
        $khoahocs = $results->khoahocs->map(function ($khoahoc) {
            // Fetch ratings for the course
            $danhgia = DanhGia::where('id_khoahoc', $khoahoc->id)->get();

            // Fetch lessons for the course
            $baihoc = BaiHoc::where('id_khoahoc', $khoahoc->id)->get();

            // Extract the IDs of the lessons
            $baihocIds = $baihoc->pluck('id')->toArray();

            // Fetch videos related to the lessons
            $video = Video::whereIn('id_baihoc', $baihocIds)->get();
            $trinhdo = TrinhDo::where('id_khoahoc', $khoahoc->id)->first();

            // Return the course resource with ratings and videos
            return new KhoaHocApiResource($khoahoc, $danhgia, $video, $trinhdo);
        });

        return response()->json($khoahocs);
    }

    return response()->json([], 404);
});
Route::get('Khoahoctheloaicon/{id}', function ($id) {
    // Fetch the topic with its related courses and instructors
    $results = TheLoaiCon::with(['khoahocs.giangvien'])->find($id);

    if ($results) {
        $khoahocs = $results->khoahocs->map(function ($khoahoc) {
            // Fetch ratings for the course
            $danhgia = DanhGia::where('id_khoahoc', $khoahoc->id)->get();

            // Fetch lessons for the course
            $baihoc = BaiHoc::where('id_khoahoc', $khoahoc->id)->get();

            // Extract the IDs of the lessons
            $baihocIds = $baihoc->pluck('id')->toArray();

            // Fetch videos related to the lessons
            $video = Video::whereIn('id_baihoc', $baihocIds)->get();
            $trinhdo = TrinhDo::where('id_khoahoc', $khoahoc->id)->first();

            // Return the course resource with ratings and videos
            return new KhoaHocApiResource($khoahoc, $danhgia, $video, $trinhdo);
        });

        return response()->json($khoahocs);
    }

    return response()->json([], 404);
});


Route::post("KhoaHocDaHoc", function (Request $request) {
    $request = request()->validate([
        'id_nguoidung' => 'required',
    ]);

    $khoahocdahoc = KhoaHocDaHoc::with(['khoahoc', 'nguoidung', 'chude'])->where('id_nguoidung', $request['id_nguoidung'])->get();
    $baihoc = BaiHoc::whereIn('id_khoahoc', $khoahocdahoc->pluck('id_khoahoc'))->get();
    $thanhtoan = ThanhToan::whereIn('id_khoahoc', $khoahocdahoc->pluck('id_khoahoc'))->get();
    if ($khoahocdahoc->isNotEmpty()) {
        return khoahocdahocApiResource::collection($khoahocdahoc->map(function ($item) use ($baihoc, $thanhtoan) {
            return new khoahocdahocApiResource($item, $baihoc, $thanhtoan);
        }));
    }
    return response()->json(["error" => "No records found"], 404);
});
Route::post("ThemKhoaHocDaHoc", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required',
        'id_khoahoc' => 'required',
    ]);

    // Check if the record already exists
    $existingRecord = KhoaHocDaHoc::where('id_nguoidung', $request['id_nguoidung'])
        ->where('id_khoahoc', $request['id_khoahoc'])
        ->first();

    if ($existingRecord) {
        return response()->json(["error" => "Khóa học đã được thêm trước đó"], 400);
    }

    // Create a new record
    $khoahocdahoc = KhoaHocDaHoc::create([
        'id_nguoidung' => $request['id_nguoidung'],
        'id_khoahoc' => $request['id_khoahoc'],
    ]);

    if ($khoahocdahoc) {
        return new khoahocdahocApiResource($khoahocdahoc);
    }

    return response()->json(["error" => "Chưa học"], 404);
});



Route::get("danhgia", function () {
    $danhgia = DanhGia::with(['nguoidung', 'khoahoc'])->get();
    return DanhGiaApiResource::collection($danhgia);
});




Route::get('/giangvien', function () {
    $giangvien = GiangVien::with(['mangxahoi'])->get();
    foreach ($giangvien as $gv) {
        $gv->mangxahoi = $gv->getMangXaHoiByGiangVienAndNguoiDung($gv->id, $gv->id_nguoidung);
    }
    return response()->json($giangvien);
});



Route::get('Khoahocchitiet/{id}', function ($id) {
    $khoaHoc = KhoaHoc::with(['giangvien.nguoidung', 'chude', 'theloaicon', 'baihocs.video'])->find($id);
    $theLoai = TheLoai::with(['theloaicons.chudes'])->get();
    $baihoc = BaiHoc::with(['video'])->get();
    $danhgia = DanhGia::where('id_khoahoc', $id)->get();
    $trinhdo = TrinhDo::where('id_khoahoc', $id)->first();
    $thanhToan = ThanhToan::where('id_khoahoc', $id)->get();
    $Tongkhoahoc = KhoaHoc::where('id_giangvien', $khoaHoc->id_giangvien)->with(['giangvien.nguoidung', 'chude', 'theloaicon', 'baihocs.video','danhgia'])->get();
    if ($khoaHoc) {
        return response()->json([
            'khoahoc' => new KhoaHocChiTietApi($khoaHoc, $theLoai, $baihoc, $danhgia, $trinhdo, $thanhToan, $Tongkhoahoc),
        ]);
    }
    return response()->json([], 404);
});

Route::post("addcart", function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required',
        'id_nguoidung' => 'required',
    ]);

    // Check if the record already exists
    $existingGioHang = GioHang::where('id_khoahoc', $request->id_khoahoc)
        ->where('id_nguoidung', $request->id_nguoidung)
        ->first();

    if ($existingGioHang) {
        return response()->json(['error' => 'Record already exists'], 409);
    }

    // Create new record if it doesn't exist
    $giohang = GioHang::create([
        'id_khoahoc' => $request->id_khoahoc,
        'id_nguoidung' => $request->id_nguoidung,
    ]);

    if ($giohang) {
        return new AddcartAPI($giohang);
    }

    return response()->json(['error' => 'Invalid credentials'], 401);
});

Route::post("xoasanphamadd", function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required',
        'id_nguoidung' => 'required',
    ]);

    $deleted = GioHang::where('id_khoahoc', $request->id_khoahoc)
        ->where('id_nguoidung', $request->id_nguoidung)
        ->delete();

    if ($deleted) {
        return response()->json(['success' => 'Record deleted'], 200);
    } else {
        return response()->json(['error' => 'Record not found'], 404);
    }
});


Route::post('login', function (Request $request) {
    // Validate input
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:6',
    ]);

    // Retrieve user by email
    $user = NguoiDung::where('email', $request->email)->first();

    // Check if user exists and password is correct
    if ($user && Hash::check($request->password, $user->matkhau)) {
        // Log the user in

        // Return user data or token along with the cookie
        return (new LoginApiResource($user));
    }

    // Return error response if login fails
    return response()->json(['error' => 'Invalid credentials'], 401);
});
Route::post('/dangky', function (Request $request) {
    $request->validate([
        'ten' => 'required',
        'email' => 'required|email|unique:nguoidung,email',
        'dienthoai' => 'required',
        'hinh' => 'required',
        // 'tieusu' => 'required',
        'matkhau' => 'required|min:6',
    ]);

    $nguoidung = NguoiDung::create([
        // 'ho' => $request->ho,
        'ten' => $request->ten,
        // 'tentaikhoan' => $request->tentaikhoan,
        'email' => $request->email,
        'dienthoai' => $request->dienthoai,
        'hinh' => $request->hinh,
        // 'tieusu' => $request->tieusu,
        'vaitro' => 0,
        'matkhau' => Hash::make($request->matkhau),
    ]);

    if ($nguoidung) {
        return new RegisterApiResource($nguoidung);
    }
    return response()->json(['error' => 'Invalid credentials'], 401);
});
Route::post('/chuyendoi', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required',
    ]);

    // Check if the user ID already exists in the giangvien table
    $existingGiangVien = GiangVien::where('id_nguoidung', $request->id_nguoidung)->first();
    if ($existingGiangVien) {
        return response()->json(['error' => 'User ID already exists in GiangVien'], 400);
    }

    $giangvien = GiangVien::create([
        'id_nguoidung' => $request->id_nguoidung,
    ]);

    NguoiDung::where('id', $request->id_nguoidung)->update(['vaitro' => 1]);

    if ($giangvien) {
        return new ChuyenDoiApiResorce($giangvien);
    }

    return response()->json(['error' => 'Invalid credentials'], 401);
});
Route::post('/showgiohang', function (Request $request) {
    // Validate input
    $request->validate([
        'id_nguoidung' => 'required|exists:nguoidung,id', // Ensure id_nguoidung exists
    ]);

    // Retrieve GioHang records by id_nguoidung
    $giohang = GioHang::where('id_nguoidung', $request->id_nguoidung)->get();

    // Check if any records are found
    if ($giohang->isNotEmpty()) {
        // Retrieve related khoahocs, nguoidungs, and giangviens
        $khoahocs = KhoaHoc::whereIn('id', $giohang->pluck('id_khoahoc'))->get();
        $nguoidungs = NguoiDung::whereIn('id', $giohang->pluck('id_nguoidung'))->get();
        $allUsers = NguoiDung::all();
        $giangviens = GiangVien::whereIn('id_nguoidung', $allUsers->pluck('id'))->get(); // Use nguoidungs here
        $danhgia = DanhGia::whereIn('id_khoahoc', $khoahocs->pluck('id'))->get();

        // Return the ShowGioHang resource
        return ShowGioHang::collection($giohang->map(function ($item) use ($khoahocs, $nguoidungs, $giangviens, $allUsers, $danhgia) {
            $khoahoc = $khoahocs->firstWhere('id', $item->id_khoahoc);
            return new ShowGioHang($item, collect([$khoahoc]), $nguoidungs, $giangviens, $allUsers, $danhgia);
        }));
    }

    // Return a 404 response if no records are found
    return response()->json([], 404);
});




Route::post('/thanhtoan', function (Request $request) {
    try {
        $request->validate([
            'total' => 'required',
            'id_nguoidung' => 'required',
            'id_khoahoc' => 'required|array',
            'id_giangvien' => 'required|array',
            'gia' => 'required|array',
            'giamgia' => 'required|array',
        ]);

        if (count($request->id_khoahoc) !== count($request->id_giohang)) {
            return response()->json(['error' => 'Dữ liệu không hợp lệ'], 400);
        }

        try {
            $doanhthuRecords = [];
            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $doanhthuRecords[] = [
                        'tong' => $request->total,
                        'gia' => $request->gia[$index][0], // Access nested array
                        'giamgia' => $request->giamgia[$index][0], // Access nested array
                        'id_giangvien' => $request->id_giangvien[$index][0], // Access nested array
                        'id_khoahoc' => $id_khoahoc,
                        'trangthai' => "Đã Thanh Toán",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            // Validate doanhthuRecords before inserting
            foreach ($doanhthuRecords as $record) {
                if (!is_array($record) || !isset($record['tong'], $record['id_giangvien'], $record['id_khoahoc'], $record['trangthai'], $record['created_at'], $record['updated_at'])) {
                    return response()->json(['error' => 'Invalid doanhthu record'], 400);
                }
            }

            $donhang = donhang::create([
                'tong' => $request->total,
                'trangthai' => 'Đã Thanh Toán',
                'phuongthucthanhtoan' => 'Chuyển Khoản',
                'id_nguoidung' => $request->id_nguoidung,
            ]);

            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $donhangchitiet = donhangchitiet::create([
                        'gia' => $request->gia[$index][0], // Access nested array
                        'giamgia' => $request->giamgia[$index][0], // Access nested array
                        'id_donhang' => $donhang->id,
                        'id_khoahoc' => $id_khoahoc,
                    ]);
                }
            }


            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $thanhtoan = ThanhToan::create([
                        'tong' => $request->total,
                        'trangthai' => 'Đã Thanh Toán',
                        'id_khoahoc' => $id_khoahoc,
                        'id_nguoidung' => $request->id_nguoidung,
                    ]);
                }
            }
            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $soluongdangky = SoLuongDangKy::where('id_khoahoc', $id_khoahoc)
                        ->where('id_giangvien', $request->id_giangvien[$index][0])
                        ->first();
                    if ($soluongdangky) {
                        $soluongdangky->soluong += 1;
                        $soluongdangky->save();
                    } else {
                        $soluongdangky = SoLuongDangKy::create([
                            'soluong' => 1,
                            'id_khoahoc' => $id_khoahoc,
                            'id_giangvien' => $request->id_giangvien[$index][0],
                        ]);
                    }
                }
            }
            $giangvien = GiangVien::where('id', $request->id_giangvien)->first();

            if ($giangvien) {
                if ($giangvien->tongdoanhthu < 0 && $giangvien->sodukhadung < 0) {
                    $giangvien->tongdoanhthu = $request->total;
                    $giangvien->sodukhadung = $request->total;
                } else if ($giangvien->tongdoanhthu >= 0 && $giangvien->sodukhadung >= 0) {
                    $giangvien->tongdoanhthu += $request->total;
                    $giangvien->sodukhadung += $request->total;
                } else if ($giangvien->tongdoanhthu >= 0 && $giangvien->sodukhadung < 0) {
                    $giangvien->tongdoanhthu += $request->total;
                    $giangvien->sodukhadung = $request->total;
                } else if ($giangvien->tongdoanhthu < 0 && $giangvien->sodukhadung >= 0) {
                    $giangvien->tongdoanhthu = $request->total;
                    $giangvien->sodukhadung = $request->total;
                }
                $giangvien->save();
            }

            $doanhthu = DoanhThu::insert($doanhthuRecords);

            if ($doanhthu && $donhang && $thanhtoan && $soluongdangky && $donhangchitiet && $giangvien) {
                return response()->json(['success' => 'Thanh toán thành công'], 200);
            }

            return response()->json(['error' => 'Không thể tạo doanh thu'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thanh toán', 'message' => $e->getMessage()], 500);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thanh toán', 'message' => $e->getMessage()], 500);
    }
});









Route::post('/thanhtoanKhoahocFree', function (Request $request) {
    try {
        $request->validate([
            'total' => 'required',
            'id_nguoidung' => 'required',
            'id_khoahoc' => 'required|array',
            'id_giangvien' => 'required|array',
            'gia' => 'required|array',
            'giamgia' => 'required|array',
        ]);

        try {
            // Flatten the id_khoahoc array
            $id_khoahoc_list = Arr::flatten($request->id_khoahoc);

            // Check if any ThanhToan record already exists for this user and courses
            $existingThanhToan = ThanhToan::where('id_nguoidung', $request->id_nguoidung)
                ->whereIn('id_khoahoc', $id_khoahoc_list)
                ->exists();

            if ($existingThanhToan) {
                return response()->json(['error' => 'Thanh toán đã tồn tại cho một trong các khóa học'], 400);
            }

            // Proceed with the rest of the code
            $doanhthuRecords = [];
            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $doanhthuRecords[] = [
                        'tong' => $request->total,
                        'gia' => $request->gia[$index][0],
                        'giamgia' => $request->giamgia[$index][0],
                        'id_giangvien' => $request->id_giangvien[$index][0],
                        'id_khoahoc' => $id_khoahoc,
                        'trangthai' => "Đã Thanh Toán",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            // Validate doanhthuRecords before inserting
            foreach ($doanhthuRecords as $record) {
                if (!is_array($record) || !isset($record['tong'], $record['id_giangvien'], $record['id_khoahoc'], $record['trangthai'], $record['created_at'], $record['updated_at'])) {
                    return response()->json(['error' => 'Invalid doanhthu record'], 400);
                }
            }

            $donhang = donhang::create([
                'tong' => $request->total,
                'trangthai' => 'Đã Thanh Toán',
                'phuongthucthanhtoan' => 'Chuyển Khoản',
                'id_nguoidung' => $request->id_nguoidung,
            ]);

            $donhangchitiet = [];
            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $donhangchitiet[] = donhangchitiet::create([
                        'gia' => $request->gia[$index][0],
                        'giamgia' => $request->giamgia[$index][0],
                        'id_donhang' => $donhang->id,
                        'id_khoahoc' => $id_khoahoc,
                    ]);
                }
            }

            $thanhtoan = [];
            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $thanhtoan[] = ThanhToan::create([
                        'tong' => $request->total,
                        'trangthai' => 'Đã Thanh Toán',
                        'id_khoahoc' => $id_khoahoc,
                        'id_nguoidung' => $request->id_nguoidung,
                    ]);
                }
            }

            // Handle SoLuongDangKy
            foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
                foreach ($id_khoahoc_array as $id_khoahoc) {
                    $soluongdangky = SoLuongDangKy::where('id_khoahoc', $id_khoahoc)
                        ->where('id_giangvien', $request->id_giangvien[$index][0])
                        ->first();
                    if ($soluongdangky) {
                        $soluongdangky->soluong += 1;
                        $soluongdangky->save();
                    } else {
                        $soluongdangky = SoLuongDangKy::create([
                            'soluong' => 1,
                            'id_khoahoc' => $id_khoahoc,
                            'id_giangvien' => $request->id_giangvien[$index][0],
                        ]);
                    }
                }
            }

            // Update GiangVien
            $id_giangvien_list = Arr::flatten($request->id_giangvien);
            foreach ($id_giangvien_list as $id_giangvien) {
                $giangvien = GiangVien::where('id', $id_giangvien)->first();

                if ($giangvien) {
                    if ($giangvien->tongdoanhthu < 0 && $giangvien->sodukhadung < 0) {
                        $giangvien->tongdoanhthu = $request->total;
                        $giangvien->sodukhadung = $request->total;
                    } else if ($giangvien->tongdoanhthu >= 0 && $giangvien->sodukhadung >= 0) {
                        $giangvien->tongdoanhthu += $request->total;
                        $giangvien->sodukhadung += $request->total;
                    } else if ($giangvien->tongdoanhthu >= 0 && $giangvien->sodukhadung < 0) {
                        $giangvien->tongdoanhthu += $request->total;
                        $giangvien->sodukhadung = $request->total;
                    } else if ($giangvien->tongdoanhthu < 0 && $giangvien->sodukhadung >= 0) {
                        $giangvien->tongdoanhthu = $request->total;
                        $giangvien->sodukhadung = $request->total;
                    }
                    $giangvien->save();
                }
            }

            $doanhthu = DoanhThu::insert($doanhthuRecords);

            if ($doanhthu && $donhang && !empty($thanhtoan) && !empty($donhangchitiet)) {
                return response()->json(['success' => 'Thanh toán thành công'], 200);
            }

            return response()->json(['error' => 'Không thể tạo doanh thu'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thanh toán', 'message' => $e->getMessage()], 500);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thanh toán', 'message' => $e->getMessage()], 500);
    }
});



















Route::post('/thenganhang', function (Request $request) {
    try {
        // Validate the request data
        $request->validate([
            'tenthe' => 'required',
            'sothe' => 'required',
            'thang' => 'required',
            'nam' => 'required',
            'mabaomat' => 'required',
            'total' => 'nullable', // Make total optional
        ]);

        // Query the TheNganHang model to find a matching record
        $thenganhang = TheNganHang::where('tenthe', $request->tenthe)
            ->where('sothe', $request->sothe)
            ->where('thang', $request->thang)
            ->where('nam', $request->nam)
            ->where('mabaomat', $request->mabaomat)
            ->first();

        if ($thenganhang) {

            if ($request->has('total')) {
                if ($thenganhang->tien >= $request->total) {
                    $thenganhang->tien -= $request->total;
                    $thenganhang->save();
                } else {
                    return response()->json(['error' => 'Số dư không đủ'], 404);
                }
            }

            return response()->json(['success' => 'Thanh toán thành công'], 200);
        } else {
            return response()->json(['error' => 'Lỗi'], 404);
        }
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình thanh toán', 'message' => $e->getMessage()], 500);
    }
});

Route::post('/xoagiohang', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required',
        'id_khoahoc' => 'required',
    ]);

    try {
        $anyDeleted = false;
        foreach ($request->id_khoahoc as $index => $id_khoahoc_array) {
            foreach ($id_khoahoc_array as $id_khoahoc) {
                $deleted = GioHang::where('id_nguoidung', $request->id_nguoidung)
                    ->where('id_khoahoc', $id_khoahoc)
                    ->delete();
                if ($deleted) {
                    $anyDeleted = true;
                }
            }
        }

        if ($anyDeleted) {
            return response()->json(['success' => 'Xóa giỏ hàng thành công'], 200);
        } else {
            return response()->json(['error' => 'Không tìm thấy giỏ hàng'], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình xóa giỏ hàng', 'message' => $e->getMessage()], 500);
    }
});

Route::post("/khoahocdadangky", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|exists:nguoidung,id', // Ensure id_nguoidung exists
    ]);

    // Retrieve GioHang records by id_nguoidung
    $giohang = ThanhToan::where('id_nguoidung', $request->id_nguoidung)->get();

    // Check if any records are found
    if ($giohang->isNotEmpty()) {
        // Retrieve related khoahocs, nguoidungs, and giangviens
        $khoahocs = KhoaHoc::whereIn('id', $giohang->pluck('id_khoahoc'))->get();
        $nguoidungs = NguoiDung::whereIn('id', $giohang->pluck('id_nguoidung'))->get();
        $allUsers = NguoiDung::all();
        $giangviens = GiangVien::whereIn('id_nguoidung', $allUsers->pluck('id'))->get(); // Use nguoidungs here
        $danhgia = DanhGia::whereIn('id_khoahoc', $khoahocs->pluck('id'))->get();

        // Return the ShowGioHang resource
        return DangKyApiResource::collection($giohang->map(function ($item) use ($khoahocs, $nguoidungs, $giangviens, $allUsers, $danhgia) {
            $khoahoc = $khoahocs->firstWhere('id', $item->id_khoahoc);
            return new DangKyApiResource($item, collect([$khoahoc]), $nguoidungs, $giangviens, $allUsers, $danhgia);
        }));
    }

    // Return a 404 response if no records are found
    return response()->json([], 404);
});
Route::post("/videodahoc", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|exists:nguoidung,id',
        'id_video' => 'required|exists:video,id',
        'trangthai' => 'required',
    ]);

    // Check if the combination of id_nguoidung and id_video already exists
    $existingRecord = VideoDaHoc::where('id_nguoidung', $request->id_nguoidung)
        ->where('id_video', $request->id_video)
        ->first();

    if ($existingRecord) {
        return response()->json(['error' => 'The combination of id_nguoidung and id_video already exists'], 409);
    }

    $videodahoc = VideoDaHoc::create([
        'id_nguoidung' => $request->id_nguoidung,
        'id_video' => $request->id_video,
        'trangthai' => $request->trangthai,
    ]);

    if ($videodahoc) {
        return new VideoDaHocApiResource($videodahoc);
    }

    return response()->json(['error' => 'Invalid credentials'], 401);
});

Route::get("kiemtravidedahoc", function (Request $request) {
    try {
        $videodahoc = VideoDaHoc::all();
        if ($videodahoc->isNotEmpty()) {
            return KiemtraVideoApiResource::collection($videodahoc);
        }
        return response()->json($videodahoc, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::post('/khoahocdanghoc', function (Request $request) {
    // Validate the request
    $request->validate([
        'id_nguoidung' => 'required|exists:nguoidung,id',
    ]);

    $videodahoc = VideoDaHoc::with('video')->where('id_nguoidung', $request->id_nguoidung)->get();
    $videodahoc1 = VideoDaHoc::with('video')->where('id_nguoidung', $request->id_nguoidung)->get();
    $video = Video::WhereIn('id', $videodahoc->pluck('id_video'))->get();
    $baihoc = BaiHoc::with(['video.khoahoc'])->get();
    $baihoc1 = BaiHoc::All();
    $baihoc2 = BaiHoc::whereIn('id_khoahoc', $videodahoc1->pluck('id_video'))->get();
    $Doanhthu = ThanhToan::where('id_nguoidung', $request->id_nguoidung)->get();

    foreach ($Doanhthu as $key => $value) {
        $Doanhthu[$key]->khoahoc = KhoaHoc::find($value->id_khoahoc);
    }

    $khoaHoc1 = KhoaHoc::with(['giangvien.nguoidung', 'chude', 'theloaicon', 'baihocs.video'])
        ->whereIn('id', $Doanhthu->pluck('id_khoahoc'))
        ->get();




    $khoaHoc = KhoaHoc::with(['giangvien.nguoidung', 'chude', 'theloaicon', 'baihocs.video'])->get();

    $videoAll = Video::all();


    if ($khoaHoc1 && $khoaHoc1->isNotEmpty()) {
        return $khoaHoc1->map(function ($khoaHoc) use ($baihoc1, $video, $videodahoc1, $videoAll) {
            return new APIbaihoc($khoaHoc, $baihoc1, $video, $videodahoc1, $videoAll);
        });
    } else {
        return response()->json([], 404);
    }

    return response()->json([$Doanhthu]);
});
Route::post('/danhgia', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|exists:nguoidung,id',
        'id_khoahoc' => 'required|exists:khoahoc,id',
        'noidung' => 'required|string',
        'danhgia' => 'required|integer|min:1|max:5',
    ]);

    try {
        $DanhGia = DanhGia::create([
            'id_nguoidung' => $request->id_nguoidung,
            'id_khoahoc' => $request->id_khoahoc,
            'binhluan' => $request->noidung, // Changed from noidung to binhluan
            'danhgia' => $request->danhgia,
        ]);

        if ($DanhGia) {
            return response()->json([
                'data' => [
                    'id' => $DanhGia->id,
                    'noi_dung' => $DanhGia->binhluan, // Changed from noidung to binhluan
                    'so_sao' => $DanhGia->danhgia,
                    'nguoi_danh_gia' => $DanhGia->id_nguoidung,
                    'ngay_danh_gia' => $DanhGia->created_at->toDateString(),
                ]
            ]);
        } else {
            return response()->json(['error' => 'Unable to create review'], 500);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while creating the review', 'message' => $e->getMessage()], 500);
    }
});

//lecturer

Route::post('/taokhoahoc', function (Request $request) {
    $request->validate([
        'ten' => 'required',
        'id_giangvien' => 'required',
        'id_chude' => 'required',
    ]);

    try {
        $khoahoc = new KhoaHoc();
        $khoahoc->ten = $request->ten;
        $khoahoc->trangthai = 'Notyet';
        $khoahoc->id_giangvien = $request->id_giangvien;
        $khoahoc->gia = "0";
        $khoahoc->giamgia = "0";
        $khoahoc->hinh = '0';
        $khoahoc->id_chude = $request->id_chude;
        $khoahoc->save();

        if ($khoahoc) {
            return response()->json(new ThemKhoaHocApiResource($khoahoc), 201);
        }

        return response()->json([
            'message' => 'Tạo khóa học không thành công'
        ], 500);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Đã xảy ra lỗi trong quá trình tạo khóa học',
            'error' => $e->getMessage()
        ], 500);
    }
});
Route::post('/kiemtragiangvien', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|exists:nguoidung,id',
    ]);

    $GiangVien = GiangVien::where('id_nguoidung', $request->id_nguoidung)->first();

    if ($GiangVien) {
        return new GiangVienApiResourc($GiangVien);
    } else {
        return response()->json([
            'error' => 'GiangVien not found'
        ], 404);
    }
});
Route::post('/laykhoahocdanglam', function (Request $request) {
    $request->validate([
        'id_giangvien' => 'required',
    ]);

    $khoahoc = KhoaHoc::with(['chude', 'theloai', 'theloaicon', 'baihocs', 'danhgia', 'ThanhToan'])->where('id_giangvien', $request->id_giangvien)->get();

    if ($khoahoc->isNotEmpty()) {
        return ShowKhoahocApiResource::collection($khoahoc);
    }


    return response()->json([], 404);
});




Route::post('/motaKhoaHocdanglam', function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
        'mota' => 'required|array',
        'mota.*' => 'string',
    ]);

    $id_khoahoc = $request->id_khoahoc;
    $newMotas = $request->mota;

    // Check if the course exists
    $existingMoTa = KhoaHoc::find($id_khoahoc);

    if ($existingMoTa) {
        // Decode existing mota to array
        $existingMotaArray = json_decode($existingMoTa->mota, true);
        if (!is_array($existingMotaArray)) {
            $existingMotaArray = [];
        }

        // Add new mota if it doesn't exist
        foreach ($newMotas as $newMota) {
            if (!in_array($newMota, $existingMotaArray)) {
                $existingMotaArray[] = $newMota;
            }
        }

        // Encode back to JSON and save
        $existingMoTa->mota = json_encode($existingMotaArray);
        $existingMoTa->save();
        return response()->json(new MoTaApiResource($existingMoTa), 200);
    } else {
        // Create new course with description
        $MoTa = KhoaHoc::create([
            'id' => $id_khoahoc,
            'muctieu' => json_encode($newMotas),
        ]);
        return response()->json(new MoTaApiResource($MoTa), 201);
    }
});

Route::get('/motaKhoaHoc/{id_khoahoc}', function ($id_khoahoc) {
    // Lấy tất cả các mô tả khóa học dựa trên id_khoahoc
    $moTas = KhoaHoc::where('id', $id_khoahoc)->get();

    if ($moTas->isEmpty()) {
        return response()->json(['error' => 'Không tìm thấy mô tả cho khóa học này'], 404);
    }

    // Trả về danh sách mô tả dưới dạng tài nguyên API
    return MoTaApiResource::collection($moTas);
});

Route::post('/updateMota', function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
        'mota' => 'required|array',
        'mota.*' => 'string',
    ]);

    $id_khoahoc = $request->id_khoahoc;
    $updatedMotas = $request->mota;

    // Check if the course exists
    $existingMoTa = KhoaHoc::find($id_khoahoc);

    if ($existingMoTa) {
        // Update mota with the new array
        $existingMoTa->muctieu = json_encode($updatedMotas);
        $existingMoTa->save();
        return response()->json(new MoTaApiResource($existingMoTa), 200);
    } else {
        return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
    }
});

Route::post('/xoamota', function (Request $request) {
    $request->validate([
        'idmota' => 'required|integer',
        'id_khoahoc' => 'required|integer',
    ]);

    $id_khoahoc = $request->id_khoahoc;
    $idmota = $request->idmota;

    // Fetch the course
    $moTa = KhoaHoc::find($id_khoahoc);

    if ($moTa) {
        // Decode the existing mota array
        $existingMotaArray = json_decode($moTa->muctieu, true);

        // Remove the specified mota
        if (isset($existingMotaArray[$idmota])) {
            unset($existingMotaArray[$idmota]);
            $moTa->muctieu = json_encode(array_values($existingMotaArray)); // Re-index array
            $moTa->save();
            return response()->json(['message' => 'Mô tả đã được xóa thành công'], 200);
        } else {
            return response()->json(['error' => 'Không tìm thấy mô tả'], 404);
        }
    } else {
        return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
    }
});
//thembaihoc













Route::post('/themBaiHoc', function (Request $request) {
    // Validate dữ liệu đầu vào
    $request->validate([
        'id_khoahoc' => 'required|integer',
        'ten' => 'required|string|max:255',
    ]);

    // Tạo bài học mới
    $baihoc = BaiHoc::create([
        'id_khoahoc' => $request->id_khoahoc,
        'ten' => $request->ten,
    ]);

    if ($baihoc) {
        return new ThemBaiHocApiresource($baihoc);
    }

    return response()->json([
        'message' => 'Không thể tạo bài học, vui lòng thử lại.'
    ], 500);
});

// Route để hiển thị bài học
Route::post("/showBaiHoc", function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
    ]);

    // Lấy các bài học theo id_khoahoc và sắp xếp theo cột 'order'
    $baihoc = BaiHoc::where('id_khoahoc', $request->id_khoahoc)
        ->orderBy('order') // Sắp xếp theo cột 'order'
        ->get();

    if ($baihoc->isNotEmpty()) {
        return ThemBaiHocApiresource::collection($baihoc);
    }

    return response()->json([], 404);
});

// Route để kéo thả bài học
Route::post("keoThaBaiHoc", function (Request $request) {
    // Validate dữ liệu đầu vào từ request
    $request->validate([
        'baihocs' => 'required|array',
        'baihocs.*.id_baihoc' => 'required|integer',
        'baihocs.*.id_khoahoc' => 'required|integer',
    ]);

    // Lặp qua từng bài học trong danh sách được gửi từ client để cập nhật thứ tự
    try {
        DB::transaction(function () use ($request) {
            foreach ($request->baihocs as $index => $baihocData) {
                BaiHoc::where('id', $baihocData['id_baihoc'])
                    ->where('id_khoahoc', $baihocData['id_khoahoc'])
                    ->update(['order' => $index + 1]);
            }
        });
        return response()->json([
            'message' => 'Cập nhật thứ tự bài học thành công',
            'status' => 200
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Lỗi khi cập nhật thứ tự bài học: ' . $e->getMessage(),
            'status' => 500
        ], 500);
    }
});

// Route để xóa bài học
Route::post('/xoabaihoc', function (Request $request) {
    $request->validate([
        "id_baihoc" => "required|integer",
    ]);
    $baihoc = BaiHoc::Where("id", $request->id_baihoc)->first();
    if ($baihoc) {
        $baihoc->delete();
        return response()->json([
            'message' => 'Bài học đã được xóa thành công',
            'status' => 200
        ]);
    }
    return response()->json([
        'message' => 'Không tìm thấy bài học',
        'status' => 404
    ], 404);
});

// Route để thêm sub bài học (video)
Route::post('/themSubBaiHoc', function (Request $request) {
    // Validate dữ liệu đầu vào
    $request->validate([
        'ten' => 'required|string|max:255',
        'id_baihoc' => 'required|integer',
    ]);

    try {
        // Tính toán giá trị order dựa trên số lượng video hiện có của bài học
        $currentMaxOrder = Video::where('id_baihoc', $request->id_baihoc)->max('order');
        $newOrder = $currentMaxOrder !== null ? $currentMaxOrder + 1 : 1; // Nếu không có sub bài học, bắt đầu từ 1

        // Tạo video mới
        $video = Video::create([
            'ten' => $request->ten,
            'thoiluong' => 0,
            'id_baihoc' => $request->id_baihoc,
            'url_link' => '0',
            'order' => $newOrder, // Thiết lập giá trị order
        ]);

        // Trả về dữ liệu của video mới nếu tạo thành công
        if ($video) {
            return response()->json([
                'data' => new ThemVideoApiresource($video),
                'message' => 'Video được tạo thành công!',
                'status' => 201
            ], 201);
        }

        // Trả về lỗi nếu không thể tạo video
        return response()->json([
            'message' => 'Không thể tạo video, vui lòng thử lại.',
            'status' => 500
        ], 500);
    } catch (\Exception $e) {
        // Bắt lỗi nếu có ngoại lệ xảy ra
        return response()->json([
            'message' => 'Đã xảy ra lỗi trong quá trình tạo video: ' . $e->getMessage(),
            'status' => 500
        ], 500);
    }
});

// Route để hiển thị sub bài học (video)
Route::post('ShowSubBaiHoc', function (Request $request) {
    // Validate dữ liệu đầu vào
    $request->validate([
        "id_baihoc" => "required|integer",
    ]);

    $subBaiHoc = Video::where('id_baihoc', $request->id_baihoc)
        ->orderBy('order', 'asc')
        ->get();

    if ($subBaiHoc->isNotEmpty()) {
        return ThemVideoApiresource::collection($subBaiHoc);
    }

    return response()->json([
        'message' => 'Không tìm thấy video cho bài học này.',
    ], 404);
});

// Route để xóa sub bài học (video)
Route::post('Xoasub', function (Request $request) {
    $request->validate([
        "id_video" => "required|integer",
    ]);

    $subBaiHoc = Video::where("id", $request->id_video)->first();
    if ($subBaiHoc) {
        $subBaiHoc->delete();
        return response()->json([
            'message' => 'Video đã được xóa thành công',
            'status' => 200
        ]);
    }

    return response()->json([
        'message' => 'Không tìm thấy video',
        'status' => 404
    ], 404);
});

// Route để di chuyển video giữa các bài học
Route::post("diChuyenVideo", function (Request $request) {
    $request->validate([
        'video_id' => 'required|integer',        // ID của video cần di chuyển
        'new_baihoc_id' => 'required|integer',   // ID của bài học mới chứa video
    ]);

    try {
        DB::transaction(function () use ($request) {
            $video = Video::find($request->video_id);

            // Kiểm tra nếu không tìm thấy video
            if (!$video) {
                throw new \Exception('Không tìm thấy video với ID: ' . $request->video_id);
            }

            // Cập nhật lại `id_baihoc` của video
            $video->update([
                'id_baihoc' => $request->new_baihoc_id,
            ]);
        });
        return response()->json([
            'message' => 'Video đã được di chuyển thành công',
            'status' => 200
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Lỗi khi di chuyển video: ' . $e->getMessage(),
            'status' => 500
        ], 500);
    }
});

// Route để sắp xếp thứ tự video
Route::post("sapXepThuTuVideo", function (Request $request) {
    // Validate dữ liệu đầu vào từ request
    $request->validate([
        'videos' => 'required|array',
        'videos.*.id_video' => 'required|integer',    // ID của video cần sắp xếp lại thứ tự
        'videos.*.id_baihoc' => 'required|integer',   // ID của bài học chứa video
    ]);

    // Lặp qua từng video trong danh sách được gửi từ client để cập nhật thứ tự
    try {
        DB::transaction(function () use ($request) {
            // Lấy id_baihoc đầu tiên để so sánh
            $firstBaiHocId = $request->videos[0]['id_baihoc'];

            // Kiểm tra tất cả video phải thuộc cùng một id_baihoc
            foreach ($request->videos as $videoData) {
                if ($videoData['id_baihoc'] != $firstBaiHocId) {
                    throw new \Exception("Tất cả các video phải thuộc cùng một bài học (id_baihoc).");
                }
            }

            // Sắp xếp lại thứ tự cho từng video
            foreach ($request->videos as $index => $videoData) {
                Video::where('id', $videoData['id_video'])
                    ->where('id_baihoc', $videoData['id_baihoc'])
                    ->update(['order' => $index + 1]);
            }
        });

        return response()->json([
            'message' => 'Cập nhật thứ tự video thành công',
            'status' => 200
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Lỗi khi sắp xếp thứ tự video: ' . $e->getMessage(),
            'status' => 500
        ], 500);
    }
});

// Route để tạo nội dung sub bài học (video)
Route::post('/taonoidungsub', function (Request $request) {
    $request->validate([
        'id_video' => 'required|integer',
        'thoiluong' => 'required|string', // Đảm bảo 'thoiluong' là chuỗi
        'url' => 'required|string',
    ]);
    $video = Video::find($request->id_video);
    if ($video) {
        $video->update([
            'thoiluong' => $request->thoiluong,
            'url_link' => $request->url,
        ]);
        return response()->json([
            'message' => 'Nội dung video được cập nhật thành công',
            'status' => 200
        ]);
    }
    return response()->json([
        'message' => 'Không tìm thấy video để cập nhật',
        'status' => 404
    ], 404);
});














//Trang Dich Lecturer
Route::post('/TrangDichKhoaHoc', function (Request $request) {
    $request->validate([
        'ten' => 'required',
        'hinh' => 'required',
        'id_khoahoc' => 'required',
        'id_chude' => 'required',
        'id_theloaicon' => 'required',
        'id_theloai' => 'required',
        'trinhdo' => 'required',
        'id_giangvien' => 'required',
        'mota' => 'required',
    ]);

    $course = KhoaHoc::find($request->id_khoahoc);

    if (!$course) {
        return response()->json([
            'message' => 'Khóa học không tồn tại.'
        ], 404);
    }

    $course->update([
        'ten' => $request->ten,
        'hinh' => $request->hinh,
        'id_chude' => $request->id_chude,
        'id_theloai' => $request->id_theloai,
        'id_theloaicon' => $request->id_theloaicon,
        'mota' => $request->mota,
    ]);

    // Check if TrinhDo already exists for the given id_khoahoc
    $trinhdo = TrinhDo::where('id_khoahoc', $request->id_khoahoc)->first();

    if (!$trinhdo) {
        $trinhdo = TrinhDo::create([
            'id_khoahoc' => $request->id_khoahoc,
            'ten' => $request->trinhdo,
            'id_giangvien' => $request->id_giangvien,
        ]);
    } else {
        $trinhdo->update([
            'ten' => $request->trinhdo,
            'id_giangvien' => $request->id_giangvien,
        ]);
    }

    return new TrangDichApiResource($course, $trinhdo);
});
Route::post('/ShowTrangDichKhoaHoc', function (Request $request) {
    // Xác thực yêu cầu
    $request->validate([
        'id_khoahoc' => 'required',
    ]);

    // Tìm khoá học và các dữ liệu liên quan
    $khoaHoc = KhoaHoc::find($request->id_khoahoc);
    $trinhdo = TrinhDo::where('id_khoahoc', $request->id_khoahoc)->first();
    $theloai = TheLoai::find($khoaHoc->id_theloai);
    $theloaicon = TheLoaiCon::find($khoaHoc->id_theloaicon);
    $chude = ChuDe::find($khoaHoc->id_chude);

    // Kiểm tra nếu dữ liệu tồn tại
    if ($khoaHoc && $trinhdo) {
        return response()->json([
            'khoahoc' => $khoaHoc,
            'trinhdo' => $trinhdo,
            'theloai' => $theloai,
            'theloaicon' => $theloaicon,
            'chude' => $chude,
        ]);
    } else {
        return response()->json(['message' => 'Không tìm thấy khoá học hoặc trình độ.'], 404);
    }
});
Route::post('/capnhatgiaKhoaHoc', function (Request $request) {
    // Xác thực yêu cầu
    $request->validate([
        'id_khoahoc' => 'required',
        'gia' => 'required',
        'giamgia' => 'required',
    ]);

    $khoaHoc = KhoaHoc::find($request->id_khoahoc);

    if ($khoaHoc) {
        try {
            $khoaHoc->update([
                'gia' => $request->gia,
                'giamgia' => $request->giamgia,
            ]);

            return new GiaApiResource($khoaHoc);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating course price.'], 500);
        }
    }

    return response()->json(['message' => 'Không tìm thấy khoá học.'], 404);
});
Route::post('/showgiaKhoaHoc', function (Request $request) {
    // Xác thực yêu cầu
    $request->validate([
        'id_khoahoc' => 'required',
    ]);

    try {
        // Tìm khóa học theo id
        $khoaHoc = KhoaHoc::find($request->id_khoahoc);

        if ($khoaHoc) {
            // Giả sử khóa học có thuộc tính giá và giảm giá
            return response()->json([
                'gia' => $khoaHoc->gia,
                'giamgia' => $khoaHoc->giamgia
            ]);
        } else {
            return response()->json(['message' => 'Không tìm thấy khoá học.'], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error fetching course price.'], 500);
    }
});
Route::post('guixemxet', function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
    ]);

    $khoaHoc = KhoaHoc::find($request->id_khoahoc);

    if ($khoaHoc) {
        $khoaHoc->update([
            'trangthai' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Gửi xem xét thành công',
            'status' => 200
        ]);
    }

    return response()->json([
        'message' => 'Không tìm thấy khóa học',
        'status' => 404
    ], 404);
});

//doanhthu
Route::Post("/DoanhThuGiangVien", function (Request $request) {
    $request->validate([
        'id_giangvien' => 'required|integer',
    ]);
    $trinhdo = TrinhDo::where('id_giangvien', $request->id_giangvien)->first();
    $GiangVien = GiangVien::where("id", $request->id_giangvien)->first();
    if (!$GiangVien) {
        return response()->json([
            'message' => 'Không tìm thấy giảng viên',
            'status' => 404
        ], 404);
    }
    return new GiangVienApiResource($GiangVien, $trinhdo);
});



Route::Post("/TongSoDangKy", function (Request $request) {
    $request->validate([
        'id_giangvien' => 'required|integer',
    ]);

    $GiangVien = DoanhThu::with('khoahocs')->where("id_giangvien", $request->id_giangvien)->get();

    if ($GiangVien->isEmpty()) {
        return response()->json([
            'message' => 'Không tìm thấy giảng viên',
            'status' => 404
        ], 404);
    }

    foreach ($GiangVien as $giangVienItem) {
        $thanhtoan = ThanhToan::where('id_khoahoc', $giangVienItem->id_khoahoc)->get();

        $baihoc = BaiHoc::where('id_khoahoc', $giangVienItem->id_khoahoc)->get();
        $chude = ChuDe::where('id', $giangVienItem->khoahocs->id_chude)->first();
        $khoahocdahoc = KhoaHocDaHoc::where('id_khoahoc', $giangVienItem->khoahocs->id)->get();
        $trinhdo = TrinhDo::where('id_giangvien', $giangVienItem->id_giangvien)->first();
        $danhgia = DanhGia::where('id_khoahoc', $giangVienItem->id_khoahoc)->get();
        $giangVienItem->trinhdo = $trinhdo;
        $giangVienItem->baihoc = $baihoc;
        $giangVienItem->danhgia = $danhgia;
        $giangVienItem->chude = $chude;
        $giangVienItem->thanhtoan = $thanhtoan;
        $giangVienItem->khoahocdahoc = $khoahocdahoc;
    }

    return response()->json([
        'data' => $GiangVien,
    ]);
});




//show Banner
Route::get('/showBanner', function () {
    $banners = Banner::all();
    if ($banners->isNotEmpty()) {
        return Showbanner::collection($banners);
    }
    return response()->json([], 404);
});

//lay nguoi dung
Route::post('/laynguoidung', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);

    $nguoidung = NguoiDung::find($request->id_nguoidung);

    if ($nguoidung) {
        return new NguoiDungApiResource($nguoidung);
    }

    return response()->json([
        'message' => 'Không tìm thấy người dùng',
        'status' => 404
    ], 404);
});
//lich su mua hang
Route::post('/lichsumuahang', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);

    $lichsu = donhang::where('id_nguoidung', $request->id_nguoidung)->get();

    if ($lichsu->isNotEmpty()) {
        return LichSuApiResource::collection($lichsu);
    }

    return response()->json([], 404);
});
Route::post("donhangchitiet", function (Request $request) {
    $request->validate([
        'id_donhang' => 'required|integer',
    ]);

    $donhang = DonHang::find($request->id_donhang);

    if ($donhang) {
        $donhangchitiet = DonHangChiTiet::where('id_donhang', $request->id_donhang)->get();
        if ($donhangchitiet->isNotEmpty()) {
            return DonHangChiTietApiResource::collection($donhangchitiet);
        }
    }

    return response()->json([], 404);
});
//lay giang vien theo id

Route::post("giangvienhientai", function (Request $request) {
    $request->validate([
        'id_giangvien' => 'required|integer',
    ]);

    // Find the GiangVien by ID
    $giangvien = GiangVien::find($request->id_giangvien);
    $trinhdo = TrinhDo::where('id_giangvien', $request->id_giangvien)->first();

    if ($giangvien) {
        return new GiangVienApiResource($giangvien, $trinhdo);
    }

    return response()->json([
        'message' => 'Không tìm thấy giảng viên',
        'status' => 404
    ], 404);
});
Route::post("giangvientheongdung", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);

    $giangvien = GiangVien::where('id_nguoidung', $request->id_nguoidung)->first();
    $trinhdo = TrinhDo::where('id_giangvien', $giangvien->id)->first();
    if ($giangvien) {
        return new GiangVienApiResource($giangvien, $trinhdo);
    }

    return response()->json([
        'message' => 'Không tìm thấy giảng viên',
        'status' => 404
    ], 404);
});
Route::post("khoahocbanduocgiangvien", function (Request $request) {
    $request->validate([
        'id_giangvien' => 'required|integer',
    ]);

    $khoahoc = DoanhThu::where('id_giangvien', $request->id_giangvien)->get();

    if ($khoahoc->isNotEmpty()) {
        return KhoaHocBanDuocGiangVien::collection($khoahoc);
    }

    return response()->json([], 404);
});
//dang ki giang vien
Route::post("dangkygiangvien", function (Request $request) {
    // Check if the request has data
    if (!$request->has(['ten', 'email', 'id_nguoidung', 'password'])) {
        return response()->json(['message' => 'Missing required fields'], 400);
    }

    // Validate the request
    $validatedData = $request->validate([
        'ten' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
        'id_nguoidung' => 'required|integer',
        'password' => 'required|string|min:8',
        'hinh' => 'nullable|string',
    ]);

    // Provide default values for nullable fields
    $validatedData['hinh'] = $validatedData['hinh'] ?? '';

    $giangvien = GiangVien::create([
        'ten' => $validatedData['ten'],
        'email' => $validatedData['email'],
        'id_nguoidung' => $validatedData['id_nguoidung'],
        'password' => Hash::make($validatedData['password']),
        'hinh' => $validatedData['hinh'],
    ]);
    $Nguoidung = NguoiDung::find($validatedData['id_nguoidung']);
    if ($Nguoidung) {
        $Nguoidung->vaitro = 1;
        $Nguoidung->save();
    }

    if ($giangvien && $Nguoidung) {
        return response()->json(['message' => 'Giang vien registered successfully']);
    }
    return response()->json(['message' => 'Giang vien registration failed'], 500);
});

Route::post("KhoaHocChungChi", function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
        'id_nguoidung' => 'required|integer',
    ]);

    // Check if the record already exists
    $existingRecord = ChungChiNguoiDung::where('id_khoahoc', $request->id_khoahoc)
        ->where('id_nguoidung', $request->id_nguoidung)
        ->first();

    if ($existingRecord) {
        return response()->json(['message' => 'User has already registered for this course.'], 409);
    }

    // Create the record
    $ChungChi = ChungChiNguoiDung::create([
        'id_khoahoc' => $request->id_khoahoc,
        'id_nguoidung' => $request->id_nguoidung,
    ]);

    if ($ChungChi) {
        // Wrap the single model instance in a collection
        return ChungChiApiResource::collection(collect([$ChungChi]));
    }

    return response()->json([], 404);
});
Route::get("ChungChi", function () {
    $ChungChi = ChungChi::where('id_nguoidung', null)
        ->where('id_chungchi', null)
        ->get();

    if ($ChungChi->isNotEmpty()) {
        return ChungChiApi::collection($ChungChi);
    }

    return response()->json([], 404);
});

Route::post("GiangVienCourseChungChi", function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
        'id_chungchi' => 'required|integer',
    ]);

    try {
        // Check if id_khoahoc already exists
        $existingChungchi = Chungchi::where('id_khoahoc', $request->id_khoahoc)->first();

        if ($existingChungchi) {
            $existingChungchi->id_chungchi = $request->id_chungchi;
            $existingChungchi->save();

            return response()->json(['message' => 'Chung chi updated successfully']);
        } else {
            // Create a new record if id_khoahoc does not exist
            $taochungchi = new Chungchi;
            $taochungchi->id_khoahoc = $request->id_khoahoc;
            $taochungchi->id_chungchi = $request->id_chungchi;
            $taochungchi->save();

            return response()->json(['message' => 'Chung chi created successfully']);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => 'Chung chi creation failed', 'error' => $e->getMessage()], 500);
    }
});

//Show NguoiDung
Route::post('CapNhatNguoiDung', function (Request $request) {
    $request = $request->validate([
        'id_nguoidung' => 'required|integer',
        'ten' => 'required|string',
        'email' => 'required|email',
        'dienthoai' => 'required|string',
        'hinh' => 'required|string',
    ]);
    $nguoidung = NguoiDung::find($request['id_nguoidung']);
    if ($nguoidung) {
        $nguoidung->update([
            'ten' => $request['ten'],
            'email' => $request['email'],
            'dienthoai' => $request['dienthoai'],
            'hinh' => $request['hinh'],
        ]);
        return response()->json(['message' => 'Cập nhật thông tin người dùng thành công']);
    }
    return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
});
//Show NguoiDung
Route::post('ShowNguoiDung', function (Request $request) {
    $request = $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);
    $nguoidung = NguoiDung::find($request['id_nguoidung']);
    if ($nguoidung) {
        return new NguoiDungApiResource($nguoidung);
    }
    return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
});

Route::post("CapNhatMatKhau", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
        'old_password' => 'required|string|min:8',
        'password' => 'required|string|min:8',
        'password_confirmation' => 'required|string|min:8|same:password',
    ]);

    $nguoidung = NguoiDung::find($request['id_nguoidung']);

    if ($nguoidung) {
        // Kiểm tra mật khẩu cũ có khớp không
        if (Hash::check($request['old_password'], $nguoidung->matkhau)) {
            $nguoidung->update([
                'matkhau' => Hash::make($request['password']),
            ]);
            return response()->json(['message' => 'Cập nhật mật khẩu thành công']);
        } else {

            return response()->json(['message' => 'Mật khẩu cũ không đúng'], 400);
        }
    }

    return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
});

Route::post('/mangxahoi', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
        'nentang' => 'required|string',
        'url' => 'required|string',
    ]);

    // Check if the record exists
    $mangxahoi = MangXaHoi::where('id_nguoidung', $request->id_nguoidung)
        ->where('nentang', $request->nentang)
        ->first();

    if ($mangxahoi) {
        // Update the existing record
        $mangxahoi->update([
            'url' => $request->url,
        ]);
    } else {
        // Create a new record
        $mangxahoi = MangXaHoi::create([
            'id_nguoidung' => $request->id_nguoidung,
            'nentang' => $request->nentang,
            'url' => $request->url
        ]);
    }

    return response()->json(['success' => true, 'data' => $mangxahoi], 200);
});
Route::post('/showmangxahoi', function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);

    $mangxahoi = MangXaHoi::where('id_nguoidung', $request->id_nguoidung)->get();

    if ($mangxahoi->isNotEmpty()) {
        return MangXaHoiApiResource::collection($mangxahoi);
    }

    return response()->json([], 404);
});

//Show GiangVien
Route::post('ShowGiangVien', function (Request $request) {
    $request = $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);
    $nguoidung = GiangVien::where('id_nguoidung', $request['id_nguoidung'])->first();
    if ($nguoidung) {
        return new NguoiDungApiResource($nguoidung);
    }
    return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
});
Route::post('CapNhatGiangVien', function (Request $request) {
    $request = $request->validate([
        'id_nguoidung' => 'required|integer',
        'ten' => 'required|string',
        'email' => 'required|email',
        'dienthoai' => 'required|string',
        'hinh' => 'required|string',
        'tieusu' => 'required|string',
    ]);
    $nguoidung = GiangVien::where('id_nguoidung', $request['id_nguoidung'])->first();
    if ($nguoidung) {
        $nguoidung->update([
            'ten' => $request['ten'],
            'email' => $request['email'],
            'dienthoai' => $request['dienthoai'],
            'hinh' => $request['hinh'],
            'tieusu' => $request['tieusu'],
        ]);
        return response()->json(['message' => 'Cập nhật thông tin người dùng thành công']);
    }
    return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
});
Route::post("CapNhatMatKhauGiangVien", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
        'old_password' => 'required|string|min:8',
        'password' => 'required|string|min:8',
        'password_confirmation' => 'required|string|min:8|same:password',
    ]);

    $nguoidung = GiangVien::where('id_nguoidung', $request['id_nguoidung'])->first();

    if ($nguoidung) {
        // Kiểm tra mật khẩu cũ có khớp không
        if (Hash::check($request['old_password'], $nguoidung->password)) {
            $nguoidung->update([
                'password' => Hash::make($request['password']),
            ]);
            return response()->json(['message' => 'Cập nhật mật khẩu thành công']);
        } else {

            return response()->json(['message' => 'Mật khẩu cũ không đúng'], 400);
        }
    }

    return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
});
//tat ca khoa hoc 
Route::get("/lotrinhkhoahoc", function () {
    $lotrinhkhoahoc = LoTrinhKhoaHoc::where('id_lotrinhkhoahoc',null)->with('khoahoc')->get();
    return response()->json($lotrinhkhoahoc);
});
Route::get("/lotrinhkhoahoccon",function(){
    $lotrinhkhoahoc = LoTrinhKhoaHocCon::where('id_lotrinhkhoahoc','!=',null)->with('khoahoc')->get();
    return response()->json($lotrinhkhoahoc);
});





Route::get("/GiangVienKhoaHocHienThi/{id}", function ($id) {
    
    $khoahoc = KhoaHoc::with(['chude', 'theloai', 'theloaicon', 'baihocs', 'danhgia', 'ThanhToan'])
        ->where('id_giangvien', $id)
        ->where('trangthai', 'active')
        ->get();
    $MangXaHoi = MangXaHoi::where('id_giangvien', $id)->get();
    if ($khoahoc->isNotEmpty()) {
        return ShowKhoahocApiResource::collection($khoahoc)->additional(['MangXaHoi' => $MangXaHoi]);
    }

    return response()->json([], 404);
});







Route::get("/showAllMaGiamGiaKhoaHoc", function () {
    $maGiamGiaKhoaHoc = Magiamgiakhoahoc::with(['khoahoc', 'magiamgia'])->get();
    return response()->json($maGiamGiaKhoaHoc);
});
Route::get("/showAllMaGiamGia", function () {
    $maGiamGia = Magiamgia::where('trangthai' ,'Đã Duyệt')->get();
    return response()->json($maGiamGia);
});



  //Thêm Người Dùng Mã Giảm Giá
  Route::post("/addNguoiDungMaGiamGia", function (Request $request) {
    $request->validate([
        'trangthai' => 'required|string|max:255',
        'dasudunghientai' => 'required|string|max:255',
        'id_nguoidung' => 'required|integer',
        'id_magiamgia' => 'required|integer',
    ]);

    $exists = NguoiDungMaGiamGia::where('id_nguoidung', $request->id_nguoidung)
                                ->where('id_magiamgia', $request->id_magiamgia)
                                ->exists();

    if ($exists) {
        return response()->json(['message' => 'Mã giảm giá đã tồn tại cho người dùng này'], 400);
    }

    $nguoiDungMaGiamGia = NguoiDungMaGiamGia::create($request->all());
    return response()->json($nguoiDungMaGiamGia, 201);
});
 //show All Người Dùng Mã Giảm Giá
 Route::post("/showAllNguoiDungMaGiamGia", function (Request $request) {
    $nguoiDungMaGiamGia = Nguoidungmagiamgia::with(['nguoidung', 'magiamgia'])->where('id_nguoidung', request()->id_nguoidung)->get();
    return response()->json($nguoiDungMaGiamGia);
});

Route::post("/addMaGiamGiaKhoaHoc", function (Request $request) {
    $request->validate([
        'id_khoahoc' => 'required|integer',
        'id_magiamgia' => 'required|integer',
    ]);

    // Check if id_khoahoc already exists
    $existingRecord = Magiamgiakhoahoc::where('id_khoahoc', $request->id_khoahoc)->first();

    if ($existingRecord) {
        // Update the existing record
        $existingRecord->update($request->all());
        return response()->json($existingRecord, 200);
    }

    // Create a new record if it doesn't exist
    $maGiamGiaKhoaHoc = Magiamgiakhoahoc::create($request->all());
    return response()->json($maGiamGiaKhoaHoc, 201);
});
Route::put("/updateMaGiamGiaKhoaHoc/{maGiamGiaKhoaHocId}", function (Request $request, $maGiamGiaKhoaHocId) {
    $maGiamGiaKhoaHoc = Magiamgiakhoahoc::find($maGiamGiaKhoaHocId);
    if (!$maGiamGiaKhoaHoc) {
        return response()->json(['error' => 'Không tìm thấy mã giảm giá khóa học'], 404);
    }

    $maGiamGiaKhoaHoc->update($request->all());

    return response()->json([
        'message' => 'Cập nhật mã giảm giá khóa học thành công',
    ]);
});


//Theo dõi GianVien id_nguoidung id_giangvien
Route::post("/TheoDoiGiangVien", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
        'id_giangvien' => 'required|integer',
    ]);

    $exists = TheoDoi::where('id_nguoidung', $request->id_nguoidung)
                                ->where('id_giangvien', $request->id_giangvien)
                                ->exists();

    if ($exists) {
        return response()->json(['message' => 'Đã theo dõi giảng viên này'], 400);
    }

    $theoDoiGiangVien = TheoDoi::create($request->all());
    return response()->json($theoDoiGiangVien, 201);
});
//Show Theo Doi
Route::post("/showAllTheoDoi", function () {
    $theoDoi = TheoDoi::with(['nguoidung', 'giangvien'])
        ->where('id_nguoidung', request()->id_nguoidung)
        ->get();
    return response()->json($theoDoi);
});
//Bo Theo Doi
Route::delete("/deleteTheoDoi/{theoDoiId}", function ($theoDoiId) {
    $theoDoi = TheoDoi::find($theoDoiId);
    if (!$theoDoi) {
        return response()->json(['error' => 'Không tìm thấy theo dõi'], 404);
    }

    $theoDoi->delete();

    return response()->json([
        'message' => 'Xóa theo dõi thành công',
    ]);
});






Route::get("/showAllNguoiDungMaGiamGia", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);

    $nguoiDungMaGiamGia = Nguoidungmagiamgia::with(['nguoidung', 'magiamgia'])
        ->where('id_nguoidung', $request->id_nguoidung)
        ->get();

    return response()->json($nguoiDungMaGiamGia);
});


Route::post("showKhoaHocYeuThich", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
    ]);
    $thanhtoan = ThanhToan::where('id_nguoidung', $request->id_nguoidung)->get();
  
    $khoahoc = YeuThich::with(['khoahoc','nguoidung'])->where('id_nguoidung', $request->id_nguoidung)->get();
    $baihoc = BaiHoc::whereIn('id_khoahoc', $khoahoc->pluck('id'))->get();
    
    if($khoahoc->isNotEmpty()){
        $khoahoc->each(function ($item) use ($thanhtoan, $baihoc) {
            $item->thanhtoan = $thanhtoan->toArray();
            $item->baihoc = $baihoc->where('id_khoahoc', $item->id)->values()->toArray();
        });

        return response()->json([
            'khoahoc' => $khoahoc,
        ]);
    }
    return response()->json([], 404);
});
//Thêm Khoa Hoc Yeu Thich
Route::post("addKhoaHocYeuThich", function (Request $request) {
    $request->validate([
        'id_nguoidung' => 'required|integer',
        'id_khoahoc' => 'required|integer',
    ]);

    $exists = YeuThich::where('id_nguoidung', $request->id_nguoidung)
                                ->where('id_khoahoc', $request->id_khoahoc)
                                ->exists();

    if ($exists) {
        return response()->json(['message' => 'Khoá học đã tồn tại trong danh sách yêu thích'], 400);
    }

    $khoahoc = YeuThich::create($request->all());
    return response()->json($khoahoc, 201);
});
//Xóa Khoa Hoc Yeu Thich
Route::delete("/deleteKhoaHocYeuThich/{khoahocId}", function ($khoahocId) {
    $khoahoc = YeuThich::find($khoahocId);
    if (!$khoahoc) {
        return response()->json(['error' => 'Không tìm thấy khoá học'], 404);
    }

    $khoahoc->delete();

    return response()->json([
        'message' => 'Xóa khoá học yêu thích thành công',
    ]);
});
//showAllNhanTin
Route::post("/showAllNhanTin", function (Request $request) {
    $nhanTin = Nhantin::with(['nguoidung', 'giangvien'])
        ->where('id_nguoidung', request()->id_nguoidung)
        ->get();
    return response()->json($nhanTin);
});
Route::post("/showAllNhanTinGiangVien", function (Request $request) {
    $nhanTin = Nhantin::with(['nguoidung', 'giangvien'])
        ->where('id_giangvien', request()->id_giangvien)
        ->get();
    return response()->json($nhanTin);
});
//Thêm Nhắn Tin
Route::post("/addNhanTin", function (Request $request) {
    // Adjust validation to match 'id_giangvien'
    $request->validate([
        'noidung' => 'required|array',
        'noidung.*.sender_id' => 'required|integer',
        'noidung.*.receiver_id' => 'required|integer',
        'noidung.*.content' => 'required|string|max:1000',
        'noidung.*.timestamp' => 'sometimes|date',
        'id_nguoidung' => 'required|integer',
        'id_giangvien' => 'required|integer', // Changed to 'id_giangvien'
    ]);

    $idNguoiDung = $request->input('id_nguoidung');
    $idGiangVien = $request->input('id_giangvien'); // Changed to 'id_giangvien'
    $newNoiDung = $request->input('noidung');

    // Assuming 'noidung' is an array of messages, take the latest message
    $latestMessage = end($newNoiDung);

    // Check if the conversation exists
    $existingConversation = Nhantin::where('id_nguoidung', $idNguoiDung)
        ->where('id_giangvien', $idGiangVien) // Changed to 'id_giangvien'
        ->first();

    if ($existingConversation) {
        // Append the new message
        $noidungArray = json_decode($existingConversation->noidung, true);
        $noidungArray[] = $latestMessage;
        $existingConversation->noidung = json_encode($noidungArray);
        $existingConversation->save();

        return response()->json([
            'message' => 'Tin nhắn đã được cập nhật thành công.',
            'nhanTin' => $existingConversation
        ], 200);
    } else {
        // Create a new conversation with the first message
        $nhanTin = Nhantin::create([
            'id_nguoidung' => $idNguoiDung,
            'id_giangvien' => $idGiangVien, // Changed to 'id_giangvien'
            'noidung' => json_encode($newNoiDung)
        ]);

        return response()->json([
            'message' => 'Tin nhắn đã được lưu thành công.',
            'nhanTin' => $nhanTin
        ], 201);
    }
});

//Xóa Nhắn Tin
Route::delete("/deleteNhanTin/{nhanTinId}", function ($nhanTinId) {
    $nhanTin = Nhantin::find($nhanTinId);
    if (!$nhanTin) {
        return response()->json(['error' => 'Không tìm thấy nhắn tin'], 404);
    }

    $nhanTin->delete();

    return response()->json([
        'message' => 'Xóa nhắn tin thành công',
    ]);
});
Route::get("showAllNguoiDung", function (Request $request) {
    $nguoidung = NguoiDung::get();
    return response()->json($nguoidung);
});
Route::post("giangVienHientai", function(Request $request) {
    $giangvien = GiangVien::where('id', $request->id_giangvien)->first();
    return response()->json($giangvien ? [$giangvien->toArray()] : []);
});