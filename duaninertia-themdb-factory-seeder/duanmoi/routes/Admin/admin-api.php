<?php

use App\Models\Bangcap;
use App\Models\Chungchi;
use App\Models\Nhantin;
use App\Models\Ruttien;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\Admin\DashboardApiResource;
use App\Http\Resources\Admin\HoanThanhApiResource;
use App\Http\Resources\Admin\ShowChiTietKhoaHoc;
use App\Http\Resources\Admin\EditCodeApi;
use App\Http\Resources\Admin\KhoaHocDaHocApiResource;
use App\Http\Resources\ThanhToanApiResource;
use App\Http\Resources\Admin\Showbanner;
use App\Http\Resources\TatCaKhoaHoc;
use Illuminate\Http\Request;



//models
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
use App\Models\KhoaHocDaHoc;
use App\Models\ThanhToan;
use App\Models\Banner;
use App\Models\Magiamgia;
use App\Models\Magiamgiakhoahoc;
use App\Models\Nguoidungmagiamgia;
use App\Models\LoTrinhKhoaHoc;
use App\Models\LoTrinhKhoaHocCon;
use App\Models\donhang;
use App\Models\donhangchitiet;
use App\Models\SoLuongDangKy;









Route::prefix('admin-api')->group(function () {
    // Your routes here




    Route::get('/dashboard', function () {
        $khoaHoc = KhoaHoc::where('trangthai', 'Pending')->with([
            'giangvien.nguoidung',
            'chude',
            'theloai',
            'theloaicon',
            'baihocs.video', // Include lessons and their videos
        ])->get();

        // You can also adjust $theLoai and $baihoc if needed
        // For this example, we'll focus on $khoaHoc

        return response()->json([
            'khoahoc' => DashboardApiResource::collection($khoaHoc),
        ]);
    });
    Route::get('/KhoahocTuChoi', function () {
        $khoaHoc = KhoaHoc::where('trangthai', 'Decline')->with([
            'giangvien.nguoidung',
            'chude',
            'theloai',
            'theloaicon',
            'baihocs.video', // Include lessons and their videos
        ])->get();

        // You can also adjust $theLoai and $baihoc if needed
        // For this example, we'll focus on $khoaHoc

        return response()->json([
            'khoahoc' => DashboardApiResource::collection($khoaHoc),
        ]);
    });
    Route::get("ChiTietKhoaHoc/{id}", function ($id) {
        try {
            $khoaHoc = KhoaHoc::with(['baihocs', 'giangvien'])->find($id);
            if (!$khoaHoc) {
                return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
            }

            return new ShowChiTietKhoaHoc($khoaHoc);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });
    Route::post("/tuchoi", function (Request $request) {
        try {
            $khoaHoc = KhoaHoc::find($request->id);
            if (!$khoaHoc) {
                return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
            }

            $khoaHoc->trangthai = "Decline";
            $khoaHoc->save();

            return response()->json([
                'message' => 'Từ chối khóa học thành công',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });
    Route::post("/chapnhan", function (Request $request) {
        try {
            $khoaHoc = KhoaHoc::find($request->id);
            if (!$khoaHoc) {
                return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
            }

            $khoaHoc->trangthai = "active";
            $khoaHoc->save();

            return response()->json([
                'message' => 'Chấp nhận khóa học thành công',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });
    Route::get("/hoanthanh", function (Request $request) {
        try {
            $khoaHoc = KhoaHoc::where('trangthai', 'active')->with([
                'giangvien.nguoidung',
                'chude',
                'theloaicon',
                'baihocs.video', // Include lessons and their videos
            ])->get();
            if (!$khoaHoc) {
                return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
            }

            return HoanThanhApiResource::collection($khoaHoc);


        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });

    Route::get('khoahoctrangthai', function (Request $request) {
        $khoahoc = KhoaHoc::with(['baihocs', 'giangvien'])->get();
        if ($khoahoc->isEmpty()) {
            return response()->json(['error' => 'Lỗi'], 404);
        }
        return HoanThanhApiResource::collection($khoahoc);
    });
    Route::get('khoahocdahoanthanh', function (Request $request) {
        $khoahocdahoc = KhoaHocDaHoc::with(['khoahoc', 'nguoidung'])->get();
        if (!$khoahocdahoc) {
            return response()->json(['error' => 'Lỗi'], 404);
        }
        return KhoaHocDaHocApiResource::collection($khoahocdahoc);
    });
    Route::get("khoahocmoi", function (Request $request) {
        $dangkymoi = ThanhToan::with(["khoahocs", "nguoidungs"])->get();
        if ($dangkymoi->isEmpty()) {
            return response()->json(["error" => "Lỗi"], 404);
        }
        return ThanhToanApiResource::collection($dangkymoi);
    });


    //chinh sua banner
    Route::get("/Showbanner", function () {
        $banner = Banner::all();
        return response()->json($banner);
    });

    Route::post("/banner", function (Request $request) {
        $request->validate([
            'tieude' => 'required|string|max:255', // Validate as a string
            'hinh' => 'required|string|max:255',   // Validate image URL as string
            'mota' => 'required|string|max:255',
        ]);

        try {
            $banner = Banner::create([
                'tieude' => $request->tieude,
                'hinh' => $request->hinh,
                'mota' => $request->mota,
            ]);
            return response()->json($banner, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to create banner'], 500);
        }
    });


    Route::put("/banner", function (Request $request) {
        $validatedData = $request->validate([
            'hinh' => 'required|string|max:255',
            'id' => 'required|integer',
            'tieude' => 'required|string|max:255',
            'trangthai' => 'required|integer',
        ]);

        $banner = Banner::find($validatedData['id']);
        if ($banner) {
            $banner->hinh = $validatedData['hinh'];
            $banner->tieude = $validatedData['tieude'];
            $banner->trangthai = $validatedData['trangthai'];

            if ($validatedData['trangthai'] != 1) {
                Banner::where('id', '!=', $validatedData['id'])->update(['trangthai' => 1]);
            }

            $banner->save();
            return response()->json(['message' => 'Banner updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Banner not found'], 404);
        }
    });


    Route::get("/tatcagiangvien", function () {
        $giangvien = GiangVien::with('nguoidung')->get();
        return response()->json($giangvien);
    });
    Route::get("Tatcakhoahoc", function () {
        $khoahocCollection = KhoaHoc::with(['giangvien.nguoidung', 'chude', 'theloaicon'])->get();

        // Fetch dangky and baihocs data for each khoahoc
        $khoahocCollection->each(function ($khoahoc) {
            $khoahoc->dangky = ThanhToan::where('id_khoahoc', $khoahoc->id)->get();
            $khoahoc->baihocs = BaiHoc::where('id_khoahoc', $khoahoc->id)->get();
        });

        return TatCaKhoaHoc::collection($khoahocCollection->map(function ($khoahoc) {
            return new TatCaKhoaHoc($khoahoc, $khoahoc->dangky, $khoahoc->baihocs);
        }));
    });

    Route::post("/publishCourse/{courseId}", function ($courseId) {
        $khoaHoc = KhoaHoc::find($courseId);
        if (!$khoaHoc) {
            return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
        }

        $khoaHoc->trangthai = "active";
        $khoaHoc->save();

        return response()->json([
            'message' => 'Khóa học đã được xuất bản',
        ]);
    });

    Route::post("/hideCourse/{courseId}", function ($courseId) {
        $khoaHoc = KhoaHoc::find($courseId);
        if (!$khoaHoc) {
            return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
        }

        $khoaHoc->trangthai = "Notyet";
        $khoaHoc->save();

        return response()->json([
            'message' => 'Khóa học đã được ẩn',
        ]);
    });
    Route::put("/updateCourse/{courseId}", function (Request $request, $courseId) {
        $khoaHoc = KhoaHoc::find($courseId);
        if (!$khoaHoc) {
            return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
        }

        $khoaHoc->update($request->all());

        return response()->json([
            'message' => 'Cập nhật khóa học thành công',
        ]);
    });
    Route::delete("/deleteCourse/{courseId}", function ($courseId) {
        $khoaHoc = KhoaHoc::find($courseId);
        if (!$khoaHoc) {
            return response()->json(['error' => 'Không tìm thấy khóa học'], 404);
        }

        $khoaHoc->delete();

        return response()->json([
            'message' => 'Xóa khóa học thành công',
        ]);
    });
    Route::post("/addCourse", function (Request $request) {
        $khoaHoc = KhoaHoc::create($request->all());
        return response()->json($khoaHoc, 201);

    });

    Route::get("/tatcanguoidung", function () {
        $nguoidung = NguoiDung::all();
        return response()->json($nguoidung);
    });
    //sửa trạng thái người dùng 
    Route::put("/updateUser/{userId}", function (Request $request, $userId) {
        $nguoidung = NguoiDung::find($userId);
        if (!$nguoidung) {
            return response()->json(['error' => 'Không tìm thấy người dùng'], 404);
        }

        $nguoidung->update($request->all());

        return response()->json([
            'message' => 'Cập nhật người dùng thành công',
        ]);
    });
    Route::delete("/deleteUser/{userId}", function ($userId) {
        $nguoidung = NguoiDung::find($userId);
        if (!$nguoidung) {
            return response()->json(['error' => 'Không tìm thấy người dùng'], 404);
        }

        $nguoidung->delete();

        return response()->json([
            'message' => 'Xóa người dùng thành công',
        ]);
    });

    Route::post("/addUser", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'dienthoai' => 'required|string|max:20',
            'hinh' => 'required|string|max:255',
            'matkhau' => 'required|string|max:255',
        ]);

        $data = $request->all();
        $data['matkhau'] = Hash::make($data['matkhau']); // Hash the password

        $nguoidung = NguoiDung::create($data);
        return response()->json($nguoidung, 201);
    });



    //Thêm xóa sửa THể Loại
    //show All Thể Loại APi/theloai
    //Thêm Thể loại
    Route::post("/addTheLoai", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'hinh' => 'required|string|max:255',
        ]);

        $theloai = TheLoai::create($request->all());
        return response()->json($theloai, 201);
    });
    //Xóa Thể Loại
    Route::delete("/deleteTheLoai/{theloaiId}", function ($theloaiId) {
        $theloai = TheLoai::find($theloaiId);
        if (!$theloai) {
            return response()->json(['error' => 'Không tìm thấy thể loại'], 404);
        }

        $theloai->delete();

        return response()->json([
            'message' => 'Xóa thể loại thành công',
        ]);
    });
    //Sửa Thể Loại
    Route::put("/updateTheLoai/{theloaiId}", function (Request $request, $theloaiId) {
        $theloai = TheLoai::find($theloaiId);
        if (!$theloai) {
            return response()->json(['error' => 'Không tìm thấy thể loại'], 404);
        }

        $theloai->update($request->all());

        return response()->json([
            'message' => 'Cập nhật thể loại thành công',
        ]);
    });




    //Thêm Xóa Sửa Thể Loại Con
    //show All Thể Loại Con APi/theloai
    //Thêm Thể loại con
    Route::post("/addTheLoaiCon", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'hinh' => 'required|string|max:255',
            'id_theloai' => 'required|integer',
        ]);

        $theloai = TheLoaiCon::create($request->all());
        return response()->json($theloai, 201);
    });
    //Xóa Thể Loại Con
    Route::delete("/deleteTheLoaiCon/{theloaiId}", function ($theloaiId) {
        $theloai = TheLoaiCon::find($theloaiId);
        if (!$theloai) {
            return response()->json(['error' => 'Không tìm thấy thể loại'], 404);
        }

        $theloai->delete();

        return response()->json([
            'message' => 'Xóa thể loại thành công',
        ]);
    });
    //Sửa Thể Loại Con
    Route::put("/updateTheLoaiCon/{theloaiId}", function (Request $request, $theloaiId) {
        $theloai = TheLoaiCon::find($theloaiId);
        if (!$theloai) {
            return response()->json(['error' => 'Không tìm thấy thể loại'], 404);
        }

        $theloai->update($request->all());

        return response()->json([
            'message' => 'Cập nhật thể loại thành công',
        ]);
    });
    Route::get("/showAllTheLoai", function () {
        $theloai = TheLoai::where('id_theloai', null)->get();
        return response()->json($theloai);
    });
    Route::get("/showAllTheLoaiCon", function () {
        $theloai = TheLoaiCon::whereNotNull('id_theloai')->get();
        return response()->json($theloai);
    });
    Route::Delete("/deleteAllCourses", function () {
        $khoahoc = KhoaHoc::all();
        $khoahoc->each->delete();
        return response()->json(['message' => 'Xóa tất cả khóa học thành công']);
    });

    //Thêm Xóa Sửa Chủ Đề
    //show All Chủ Đề APi/theloai
    //Thêm Chủ Đề
    Route::post("/createChuDe", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'hinh' => 'required|string|max:255',
            'mota' => 'required|string|max:255',
            'id_theloaicon' => 'required|integer',
        ]);

        $chude = ChuDe::create($request->all());
        return response()->json($chude, 201);
    });
    //Xóa Chủ Đề
    Route::delete("/deleteChuDe/{chudeId}", function ($chudeId) {
        $chude = ChuDe::find($chudeId);
        if (!$chude) {
            return response()->json(['error' => 'Không tìm thấy chủ đề'], 404);
        }

        $chude->delete();

        return response()->json([
            'message' => 'Xóa chủ đề thành công',
        ]);
    });
    //Sửa Chủ Đề
    Route::put("/updateChuDe/{chudeId}", function (Request $request, $chudeId) {
        $chude = ChuDe::find($chudeId);
        if (!$chude) {
            return response()->json(['error' => 'Không tìm thấy chủ đề'], 404);
        }

        $chude->update($request->all());

        return response()->json([
            'message' => 'Cập nhật chủ đề thành công',
        ]);
    });

    //Thêm Xóa Sửa Trình Độ
    //ten //	id_giangvien //id_khoahoc 
    //show All Trình Độ 
    Route::get("/showAllTrinhDo", function () {
        $trinhdo = TrinhDo::all();
        return response()->json($trinhdo);
    });
    //Thêm Trình Độ
    Route::post("/addTrinhDo", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'id_giangvien' => 'required|integer',
            'id_khoahoc' => 'required|integer',
        ]);

        $trinhdo = TrinhDo::create($request->all());
        return response()->json($trinhdo, 201);
    });
    //Xóa Trình Độ
    Route::delete("/deleteTrinhDo/{trinhdoId}", function ($trinhdoId) {
        $trinhdo = TrinhDo::find($trinhdoId);
        if (!$trinhdo) {
            return response()->json(['error' => 'Không tìm thấy trình độ'], 404);
        }

        $trinhdo->delete();

        return response()->json([
            'message' => 'Xóa trình độ thành công',
        ]);
    });
    //Sửa Trình Độ
    Route::put("/updateTrinhDo/{trinhdoId}", function (Request $request, $trinhdoId) {
        $trinhdo = TrinhDo::find($trinhdoId);
        if (!$trinhdo) {
            return response()->json(['error' => 'Không tìm thấy trình độ'], 404);
        }

        $trinhdo->update($request->all());

        return response()->json([
            'message' => 'Cập nhật trình độ thành công',
        ]);
    });

    //Thêm Xóa Sửa Chứng Chỉ
    //show All Chứng Chỉ
    Route::get("/showAllChungChi", function () {
        $chungchi = Chungchi::whereNotNull('ten')->get();
        return response()->json($chungchi);
    });
    //Thêm Chứng Chỉ ten phathanhboi hieuluc 	giaychungnhan id_khoahoc  id_nguoidung id_chungchi loai landscape//portrait
    Route::post("/addChungChi", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'phathanhboi' => 'required|string|max:255',
            'hieuluc' => 'required|string|max:255',
            'giaychungnhan' => 'required|string|max:255',
            'loai' => 'required|string|max:255',
        ]);

        $chungchi = Chungchi::create($request->all());
        return response()->json($chungchi, 201);
    });
    //Xóa Chứng Chỉ

    Route::delete("/deleteChungChi/{chungchiId}", function ($chungchiId) {
        $chungchi = Chungchi::find($chungchiId);
        if (!$chungchi) {
            return response()->json(['error' => 'Không tìm thấy chứng chỉ'], 404);
        }

        try {
            $chungchi->delete();
            return response()->json([
                'message' => 'Xóa chứng chỉ thành công',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Đã xảy ra lỗi khi xóa chứng chỉ'], 500);
        }
    });
    //Sửa Chứng Chỉ
    Route::put("/updateChungChi/{chungchiId}", function (Request $request, $chungchiId) {
        $chungchi = Chungchi::find($chungchiId);
        if (!$chungchi) {
            return response()->json(['error' => 'Không tìm thấy chứng chỉ'], 404);
        }

        $chungchi->update($request->all());

        return response()->json([
            'message' => 'Cập nhật chứng chỉ thành công',
        ]);
    });

    //Thêm Xóa Sửa Nhắn Tin
    //show All Nhắn Tin //noidung id_nguoidung id_giangVien
    Route::get("/showAllNhanTin", function () {
        $nhanTin = Nhantin::with(['nguoidung', 'giangvien'])->get();
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
    //Sửa Nhắn Tin
    Route::put("/updateNhanTin/{nhanTinId}", function (Request $request, $nhanTinId) {
        // Find the Nhantin record by ID
        $nhanTin = Nhantin::find($nhanTinId);
        if (!$nhanTin) {
            return response()->json(['error' => 'Không tìm thấy nhắn tin'], 404);
        }
    
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'noidung' => 'required|json',
            'id_nguoidung' => 'required|integer|exists:nguoidung,id',
            'id_giangvien' => 'required|integer|exists:giangvien,id',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        // Attempt to decode 'noidung' to ensure it's valid JSON
        $noidungDecoded = json_decode($request->noidung, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['error' => 'Nội dung không phải là JSON hợp lệ'], 400);
        }
    
        // Update the Nhantin record with validated data
        try {
            $nhanTin->noidung = json_encode($noidungDecoded, JSON_UNESCAPED_UNICODE);
            $nhanTin->id_nguoidung = $request->id_nguoidung;
            $nhanTin->id_giangvien = $request->id_giangvien;
            $nhanTin->save();
    
            return response()->json([
                'message' => 'Cập nhật nhắn tin thành công',
            ], 200);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            \Log::error('Error updating Nhantin: ' . $e->getMessage());
    
            return response()->json(['error' => 'Lỗi khi cập nhật nhắn tin'], 500);
        }
    });

    //Thêm Xóa Sửa Đánh Giá danhgia binhluan 	id_khoahoc id_nguoidung 
    //show All Đánh Giá

    Route::get("/showAllDanhGia", function () {
        $danhGia = DanhGia::with(['khoahoc', 'nguoidung'])->get();
        return response()->json($danhGia);
    });
    //Thêm Đánh Giá
    Route::post("/addDanhGia", function (Request $request) {
        $request->validate([
            'danhgia' => 'required|integer|min:0|max:5',
            'binhluan' => 'required|string|max:255',
            'id_khoahoc' => 'required|integer',
            'id_nguoidung' => 'required|integer',
        ]);

        $danhGia = DanhGia::create($request->all());
        return response()->json($danhGia, 201);
    });
    //Xóa Đánh Giá
    Route::delete("/deleteDanhGia/{danhGiaId}", function ($danhGiaId) {
        $danhGia = DanhGia::find($danhGiaId);
        if (!$danhGia) {
            return response()->json(['error' => 'Không tìm thấy đánh giá'], 404);
        }

        $danhGia->delete();

        return response()->json([
            'message' => 'Xóa đánh giá thành công',
        ]);
    });
    //Sửa Đánh Giá
    Route::put("/updateDanhGia/{danhGiaId}", function (Request $request, $danhGiaId) {
        $danhGia = DanhGia::find($danhGiaId);
        if (!$danhGia) {
            return response()->json(['error' => 'Không tìm thấy đánh giá'], 404);
        }

        $danhGia->update($request->all());

        return response()->json([
            'message' => 'Cập nhật đánh giá thành công',
        ]);
    });
    //Thêm Xóa Sửa Giảng Viên
    //show All Giảng Viên
    Route::get("/showAllGiangVien", function () {
        $giangVien = GiangVien::all();
        return response()->json($giangVien);
    });
    //Thêm Giảng Viên //ten ten// email dienthoai id_nguoidung 	password tieusu hinh tongdoanhthu sodukhadung
    Route::post("/addGiangVien", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:giangvien,email',
            'dienthoai' => 'required|string|max:20',
            'id_nguoidung' => 'required|integer',
            'password' => 'required|string|max:255',
            'tieusu' => 'required|string|max:255',
            'hinh' => 'required|string|max:255',
            'tongdoanhthu' => 'required|numeric|min:0',
            'sodukhadung' => 'required|numeric|min:0',
        ]);

        $data = $request->all();
        $data['password'] = Hash::make($data['password']); // Hash the password

        $giangVien = GiangVien::create($data);
        return response()->json($giangVien, 201);
    });
    //Xóa Giảng Viên
    Route::delete("/deleteGiangVien/{giangVienId}", function ($giangVienId) {
        $giangVien = GiangVien::find($giangVienId);
        if (!$giangVien) {
            return response()->json(['error' => 'Không tìm thấy giảng viên'], 404);
        }

        $giangVien->delete();

        return response()->json([
            'message' => 'Xóa giảng viên thành công',
        ]);
    });
    //Sửa Giảng Viên
    Route::put("/updateGiangVien/{giangVienId}", function (Request $request, $giangVienId) {
        $giangVien = GiangVien::find($giangVienId);
        if (!$giangVien) {
            return response()->json(['error' => 'Không tìm thấy giảng viên'], 404);
        }

        $data = $request->all();

        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']); // Prevent updating the password if it's not provided
        }

        $giangVien->update($data);

        return response()->json([
            'message' => 'Cập nhật giảng viên thành công',
        ]);
    });

    //Thêm xóa sửa rút tiền tong id_giangvien id_thenganhang
    //show All Rút Tiền
    Route::get("/showAllRutTien", function () {
        $rutTien = Ruttien::with(['giangvien', 'thenganhang'])->get();
        return response()->json($rutTien);
    });
    //Thêm Rút Tiền
    Route::post("/addRutTien", function (Request $request) {
        $request->validate([
            'tong' => 'required|string|max:255',
            'id_giangvien' => 'required|integer',
            'id_thenganhang' => 'required|integer',
        ]);

        $rutTien = Ruttien::create($request->all());
        return response()->json($rutTien, 201);
    });
    //Xóa Rút Tiền
    Route::delete("/deleteRutTien/{rutTienId}", function ($rutTienId) {
        $rutTien = Ruttien::find($rutTienId);
        if (!$rutTien) {
            return response()->json(['error' => 'Không tìm thấy rút tiền'], 404);
        }

        $rutTien->delete();

        return response()->json([
            'message' => 'Xóa rút tiền thành công',
        ]);
    });
    //Sửa Rút Tiền
    Route::put("/updateRutTien/{rutTienId}", function (Request $request, $rutTienId) {
        $rutTien = Ruttien::find($rutTienId);
        if (!$rutTien) {
            return response()->json(['error' => 'Không tìm thấy rút tiền'], 404);
        }

        $rutTien->update($request->all());

        return response()->json([
            'message' => 'Cập nhật rút tiền thành công',
        ]);
    });
    //Thêm xóa sửa Bằng cấp  ten url tochuc nam id_giangvien 
    //show All Bằng cấp ten url tochuc 	nam id_giangvien
    Route::get("/showAllBangCap", function () {
        $bangCap = Bangcap::with('giangvien')->get();
        return response()->json($bangCap);
    });
    //Thêm Bằng cấp
    Route::post("/addBangCap", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'tochuc' => 'required|string|max:255',
            'nam' => 'required|string|max:255',
            'id_giangvien' => 'required|integer',
        ]);
    
        $bangCap = Bangcap::create($request->all());
        return response()->json($bangCap, 201);
    });
    //Xóa Bằng cấp
    Route::delete("/deleteBangCap", function ($bangCapId) {
        $bangCap = Bangcap::find($bangCapId);
        if (!$bangCap) {
            return response()->json(['error' => 'Không tìm thấy bằng cấp'], 404);
        }

        $bangCap->delete();

        return response()->json([
            'message' => 'Xóa bằng cấp thành công',
        ]);
    });
    Route::post("/deleteAllBangCap", function (Request $request) {
        $ids = $request->input('ids');
        if (is_array($ids) && !empty($ids)) {
            Bangcap::whereIn('id', $ids)->delete();
            return response()->json([
                'message' => 'Xóa tất cả bằng cấp thành công',
            ]);
        } else {
            return response()->json([
                'message' => 'Không có ID nào được cung cấp hoặc danh sách ID trống',
            ], 400);
        }
    });
    //Sửa Bằng cấp
    Route::put("/updateBangCap/{bangCapId}", function (Request $request, $bangCapId) {
        $bangCap = Bangcap::find($bangCapId);
        if (!$bangCap) {
            return response()->json(['error' => 'Không tìm thấy bằng cấp'], 404);
        }

        $bangCap->update($request->all());

        return response()->json([
            'message' => 'Cập nhật bằng cấp thành công',
        ]);
    });

    //Thêm xóa sửa Thẻ Ngân Hàng tenthe sothe thang nam mabaomat	tien
    //show All Thẻ Ngân Hàng
    Route::get("/showAllTheNganHang", function () {
        $theNganHang = TheNganHang::all();
        return response()->json($theNganHang);
    });
    //Thêm Thẻ Ngân Hàng
    Route::post("/addTheNganHang", function (Request $request) {
        $request->validate([
            'tenthe' => 'required|string|max:255',
            'sothe' => 'required|string|max:255',
            'thang' => 'required|string|max:255',
            'nam' => 'required|string|max:255',
            'mabaomat' => 'required|string|max:255',
            'tien' => 'required|string|max:255',
        ]);

        $theNganHang = TheNganHang::create($request->all());
        return response()->json($theNganHang, 201);
    });
    //Xóa Thẻ Ngân Hàng
    Route::delete("/deleteTheNganHang/{theNganHangId}", function ($theNganHangId) {
        $theNganHang = TheNganHang::find($theNganHangId);
        if (!$theNganHang) {
            return response()->json(['error' => 'Không tìm thấy thẻ ngân hàng'], 404);
        }

        $theNganHang->delete();

        return response()->json([
            'message' => 'Xóa thẻ ngân hàng thành công',
        ]);
    });
    //Sửa Thẻ Ngân Hàng
    Route::put("/updateTheNganHang/{theNganHangId}", function (Request $request, $theNganHangId) {
        $theNganHang = TheNganHang::find($theNganHangId);
        if (!$theNganHang) {
            return response()->json(['error' => 'Không tìm thấy thẻ ngân hàng'], 404);
        }

        $theNganHang->update($request->all());

        return response()->json([
            'message' => 'Cập nhật thẻ ngân hàng thành công',
        ]);
    });
    //Thêm Xóa sửa Bài Học ten id_khoahoc  mota
    //show All Bài Học
    Route::get("/showAllBaiHoc", function () {
        $baiHoc = BaiHoc::all();
        return response()->json($baiHoc);
    });
    //Thêm Bài Học
    Route::post("/addBaiHoc", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'id_khoahoc' => 'required|integer',
            'mota' => 'required|string|max:255',
        ]);

        $baiHoc = BaiHoc::create($request->all());
        return response()->json($baiHoc, 201);
    });
    //Xóa Bài Học
    Route::delete("/deleteBaiHoc/{baiHocId}", function ($baiHocId) {
        $baiHoc = BaiHoc::find($baiHocId);
        if (!$baiHoc) {
            return response()->json(['error' => 'Không tìm thấy bài học'], 404);
        }

        $baiHoc->delete();

        return response()->json([
            'message' => 'Xóa bài học thành công',
        ]);
    });
    //Sửa Bài Học
    Route::put("/updateBaiHoc/{baiHocId}", function (Request $request, $baiHocId) {
        $baiHoc = BaiHoc::find($baiHocId);
        if (!$baiHoc) {
            return response()->json(['error' => 'Không tìm thấy bài học'], 404);
        }

        $baiHoc->update($request->all());

        return response()->json([
            'message' => 'Cập nhật bài học thành công',
        ]);
    });
    //Thêm Xóa sửa Video ten thoiluong id_baihoc mota url_link
    //show All Video
    Route::get("/showAllVideo", function () {
        $video = Video::all();
        return response()->json($video);
    });
    //Thêm Video
    Route::post("/addVideo", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'thoiluong' => 'required|string|max:255',
            'id_baihoc' => 'required|integer',
            'mota' => 'required|string|max:255',
            'url_link' => 'required|string|max:255',
        ]);

        $video = Video::create($request->all());
        return response()->json($video, 201);
    });
    //Xóa Video
    Route::delete("/deleteVideo/{videoId}", function ($videoId) {
        $video = Video::find($videoId);
        if (!$video) {
            return response()->json(['error' => 'Không tìm thấy video'], 404);
        }

        $video->delete();

        return response()->json([
            'message' => 'Xóa video thành công',
        ]);
    });
    //Sửa Video
    Route::put("/updateVideo/{videoId}", function (Request $request, $videoId) {
        $video = Video::find($videoId);
        if (!$video) {
            return response()->json(['error' => 'Không tìm thấy video'], 404);
        }

        $video->update($request->all());

        return response()->json([
            'message' => 'Cập nhật video thành công',
        ]);
    });
    //Thêm Xóa sửa VideoDaHoc trangthai id_video  id_nguoidung 
    //show All VideoDaHoc
    Route::get("/showAllVideoDaHoc", function () {
        $videoDaHoc = VideoDaHoc::all();
        return response()->json($videoDaHoc);
    });
    //Thêm VideoDaHoc
    Route::post("/addVideoDaHoc", function (Request $request) {
        $request->validate([
            'trangthai' => 'required|string|max:255',
            'id_video' => 'required|integer',
            'id_nguoidung' => 'required|integer',
        ]);

        $videoDaHoc = VideoDaHoc::create($request->all());
        return response()->json($videoDaHoc, 201);
    });
    //Xóa VideoDaHoc
    Route::delete("/deleteVideoDaHoc/{videoDaHocId}", function ($videoDaHocId) {
        $videoDaHoc = VideoDaHoc::find($videoDaHocId);
        if (!$videoDaHoc) {
            return response()->json(['error' => 'Không tìm thấy video đã học'], 404);
        }

        $videoDaHoc->delete();

        return response()->json([
            'message' => 'Xóa video đã học thành công',
        ]);
    });
    //Sửa VideoDaHoc
    Route::put("/updateVideoDaHoc/{videoDaHocId}", function (Request $request, $videoDaHocId) {
        $videoDaHoc = VideoDaHoc::find($videoDaHocId);
        if (!$videoDaHoc) {
            return response()->json(['error' => 'Không tìm thấy video đã học'], 404);
        }

        $videoDaHoc->update($request->all());

        return response()->json([
            'message' => 'Cập nhật video đã học thành công',
        ]);
    });

    //MaGiamGia maso giamggia luotsudung sudunghientai trangthai ngaybatdau	 ngayketthuc id_giangvien 
    //show All Mã Giảm Giá
    Route::get("/showAllMaGiamGia", function () {
        $maGiamGia = Magiamgia::all();
        return response()->json($maGiamGia);
    });
    //Thêm Mã Giảm Giá


    Route::post("/addMaGiamGia", function (Request $request) {
        $request->validate([
            'maso' => 'required|string|max:255',
            'giamgia' => 'required|string|max:255', // Corrected field name
            'luotsudung' => 'required|string|max:255',
            'sudunghientai' => 'required|string|max:255',
            'trangthai' => 'required|string|max:255',
            'ngaybatdau' => 'required|string|max:255',
            'ngayketthuc' => 'required|string|max:255',
            'id_giangvien' => 'required|integer',
        ]);
    
        $maGiamGia = Magiamgia::create($request->all());
        return response()->json($maGiamGia, 201);
    });
    //Xóa Mã Giảm Giá
    Route::delete("/deleteMaGiamGia/{maGiamGiaId}", function ($maGiamGiaId) {
        $maGiamGia = Magiamgia::find($maGiamGiaId);
        if (!$maGiamGia) {
            return response()->json(['error' => 'Không tìm thấy mã giảm giá'], 404);
        }

        $maGiamGia->delete();

        return response()->json([
            'message' => 'Xóa mã giảm giá thành công',
        ]);
    });
    //Sửa Mã Giảm Giá
    Route::put("/updateMaGiamGia/{maGiamGiaId}", function (Request $request, $maGiamGiaId) {
        $maGiamGia = Magiamgia::find($maGiamGiaId);
        if (!$maGiamGia) {
            return response()->json(['error' => 'Không tìm thấy mã giảm giá'], 404);
        }

        $maGiamGia->update($request->all());

        return response()->json([
            'message' => 'Cập nhật mã giảm giá thành công',
        ]);
    });
    //mã giảm giá khóa học id_khoahoc id_magiamgia
    //show All Mã Giảm Giá Khóa Học
    Route::get("/showAllMaGiamGiaKhoaHoc", function () {
        $maGiamGiaKhoaHoc = Magiamgiakhoahoc::with(['khoahoc', 'magiamgia'])->get();
        return response()->json($maGiamGiaKhoaHoc);
    });
    //Thêm Mã Giảm Giá Khóa Học
    Route::post("/addMaGiamGiaKhoaHoc", function (Request $request) {
        $request->validate([
            'id_khoahoc' => 'required|integer',
            'id_magiamgia' => 'required|integer',
        ]);

        $maGiamGiaKhoaHoc = Magiamgiakhoahoc::create($request->all());
        return response()->json($maGiamGiaKhoaHoc, 201);
    });
    //Xóa Mã Giảm Giá Khóa Học
    Route::delete("/deleteMaGiamGiaKhoaHoc/{maGiamGiaKhoaHocId}", function ($maGiamGiaKhoaHocId) {
        $maGiamGiaKhoaHoc = Magiamgiakhoahoc::find($maGiamGiaKhoaHocId);
        if (!$maGiamGiaKhoaHoc) {
            return response()->json(['error' => 'Không tìm thấy mã giảm giá khóa học'], 404);
        }

        $maGiamGiaKhoaHoc->delete();

        return response()->json([
            'message' => 'Xóa mã giảm giá khóa học thành công',
        ]);
    });
    //Sửa Mã Giảm Giá Khóa Học
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
    //NguoiDungMaGiamGia trangthai dasudunghientai id_nguoidung 'id_magiamgia
    //show All Người Dùng Mã Giảm Giá
    Route::get("/showAllNguoiDungMaGiamGia", function () {
        $nguoiDungMaGiamGia = Nguoidungmagiamgia::with(['nguoidung', 'magiamgia'])->get();
        return response()->json($nguoiDungMaGiamGia);
    });
    //Thêm Người Dùng Mã Giảm Giá
    Route::post("/addNguoiDungMaGiamGia", function (Request $request) {
        $request->validate([
            'trangthai' => 'required|string|max:255',
            'dasudunghientai' => 'required|string|max:255',
            'id_nguoidung' => 'required|integer',
            'id_magiamgia' => 'required|integer',
        ]);

        $nguoiDungMaGiamGia = Nguoidungmagiamgia::create($request->all());
        return response()->json($nguoiDungMaGiamGia, 201);
    });
    //Xóa Người Dùng Mã Giảm Giá
    Route::delete("/deleteNguoiDungMaGiamGia/{nguoiDungMaGiamGiaId}", function ($nguoiDungMaGiamGiaId) {
        $nguoiDungMaGiamGia = Nguoidungmagiamgia::find($nguoiDungMaGiamGiaId);
        if (!$nguoiDungMaGiamGia) {
            return response()->json(['error' => 'Không tìm thấy người dùng mã giảm giá'], 404);
        }

        $nguoiDungMaGiamGia->delete();

        return response()->json([
            'message' => 'Xóa người dùng mã giảm giá thành công',
        ]);
    });
    //Sửa Người Dùng Mã Giảm Giá
    Route::put("/updateNguoiDungMaGiamGia/{nguoiDungMaGiamGiaId}", function (Request $request, $nguoiDungMaGiamGiaId) {
        $nguoiDungMaGiamGia = Nguoidungmagiamgia::find($nguoiDungMaGiamGiaId);
        if (!$nguoiDungMaGiamGia) {
            return response()->json(['error' => 'Không tìm thấy người dùng mã giảm giá'], 404);
        }

        $nguoiDungMaGiamGia->update($request->all());

        return response()->json([
            'message' => 'Cập nhật người dùng mã giảm giá thành công',
        ]);
    });



    Route::get("/lotrinhkhoahoc", function () {
        $lotrinhkhoahoc = LoTrinhKhoaHoc::where('id_lotrinhkhoahoc',null)->with('khoahoc')->get();
        return response()->json($lotrinhkhoahoc);
    });
    Route::get("/lotrinhkhoahoccon",function(){
        $lotrinhkhoahoc = LoTrinhKhoaHocCon::where('id_lotrinhkhoahoc','!=',null)->with('khoahoc','lotrinhkhoahoc')->get();
        return response()->json($lotrinhkhoahoc);
    });

    Route::post("/addLoTrinhKhoaHoc", function (Request $request) {
        $request->validate([
            'ten' => 'required|string|max:255',
            'hinh' => 'required|string|max:255',
            'mota' => 'required|string|max:255',
        ]);
        $lotrinhkhoahoc = LoTrinhKhoaHoc::create($request->all());
        return response()->json($lotrinhkhoahoc, 201);
    });









    Route::post("/addLoTrinhKhoaHocCon", function(Request $request){
        // Validate incoming request data
        $request->validate([
            'id_khoahoc' => 'required|integer',
            'id_lotrinhkhoahoc' => 'required|integer',
        ]);
    
        // Check if the course already exists in the specified path
        $existing = LoTrinhKhoaHocCon::where('id_khoahoc', $request->id_khoahoc)
                                     ->where('id_lotrinhkhoahoc', $request->id_lotrinhkhoahoc)
                                     ->exists();
    
        if ($existing) {
            return response()->json(['error' => 'Khóa học đã tồn tại trong lộ trình'], 409);
        }
    
        // Create new record
        $lotrinhkhoahoc = LoTrinhKhoaHocCon::create($request->all());
    
        return response()->json($lotrinhkhoahoc, 201);
    });








    Route::delete("/deleteLoTrinhKhoaHoc/{lotrinhkhoahocId}", function ($lotrinhkhoahocId) {
        $lotrinhkhoahoc = LoTrinhKhoaHoc::find($lotrinhkhoahocId);
        if (!$lotrinhkhoahoc) {
            return response()->json(['error' => 'Không tìm thấy lộ trình khóa học'], 404);
        }

        $lotrinhkhoahoc->delete();

        return response()->json([
            'message' => 'Xóa lộ trình khóa học thành công',
        ]);
    });

    Route::put("/updateLoTrinhKhoaHoc/{lotrinhkhoahocId}", function (Request $request, $lotrinhkhoahocId) {
        $lotrinhkhoahoc = LoTrinhKhoaHoc::find($lotrinhkhoahocId);
        if (!$lotrinhkhoahoc) {
            return response()->json(['error' => 'Không tìm thấy lộ trình khóa học'], 404);
        }

        $lotrinhkhoahoc->update($request->all());

        return response()->json([
            'message' => 'Cập nhật lộ trình khóa học thành công',
        ]);
    });








Route::put("/updateKhoaHocLoTrinh/{lotrinhkhoahocId}", function(Request $request, $lotrinhkhoahocId) {
    // Validate incoming request data
    $validatedData = $request->validate([
        'id_khoahoc' => 'required|integer|exists:khoahoc,id',
        'id_lotrinhkhoahoc' => 'required|integer|exists:lotrinhkhoahoc,id',
        // Add other fields you expect to update with appropriate validation rules
    ]);

    // Retrieve the specific record ensuring 'id_lotrinhkhoahoc' is not null
    $lotrinhkhoahoc = LoTrinhKhoaHocCon::where('id', $lotrinhkhoahocId)
                                       ->whereNotNull('id_lotrinhkhoahoc')
                                       ->first();

    if (!$lotrinhkhoahoc) {
        return response()->json(['error' => 'Không tìm thấy lộ trình khóa học'], 404);
    }

    // Check if another record with the same 'id_khoahoc' exists within the same 'id_lotrinhkhoahoc'
    $existing = LoTrinhKhoaHocCon::where('id_khoahoc', $validatedData['id_khoahoc'])
                                  ->where('id_lotrinhkhoahoc', $validatedData['id_lotrinhkhoahoc'])
                                  ->where('id', '!=', $lotrinhkhoahocId)
                                  ->exists();

    if ($existing) {
        return response()->json(['error' => 'Khóa học đã tồn tại trong lộ trình này'], 409);
    }

    // Update the record with validated data
    $lotrinhkhoahoc->update($validatedData);

    return response()->json([
        'message' => 'Cập nhật lộ trình khóa học thành công',
        'data' => $lotrinhkhoahoc
    ], 200);
});

//thanhtoan tong trangthai id_khoahoc id_nguoidung
//show All Thanh Toán
Route::get("/showAllThanhToan", function () {
    $thanhToan = ThanhToan::with(['khoahocs', 'nguoidungs'])->get();
    return response()->json($thanhToan);
});
//Thêm Thanh Toán
Route::post("/addThanhToan", function (Request $request) {
    $request->validate([
        'tong' => 'required|string|max:255',
        'trangthai' => 'required|string|max:255',
        'id_khoahoc' => 'required|integer',
        'id_nguoidung' => 'required|integer',
    ]);

    $thanhToan = Thanhtoan::create($request->all());
    return response()->json($thanhToan, 201);
});
//Xóa Thanh Toán
Route::delete("/deleteThanhToan/{thanhToanId}", function ($thanhToanId) {
    $thanhToan = Thanhtoan::find($thanhToanId);
    if (!$thanhToan) {
        return response()->json(['error' => 'Không tìm thấy thanh toán'], 404);
    }

    $thanhToan->delete();

    return response()->json([
        'message' => 'Xóa thanh toán thành công',
    ]);
});
//Sửa Thanh Toán
Route::put("/updateThanhToan/{thanhToanId}", function (Request $request, $thanhToanId) {
    $thanhToan = Thanhtoan::find($thanhToanId);
    if (!$thanhToan) {
        return response()->json(['error' => 'Không tìm thấy thanh toán'], 404);
    }

    $thanhToan->update($request->all());

    return response()->json([
        'message' => 'Cập nhật thanh toán thành công',
    ]);
});



//don hang tong    trangthai phuongthucthanhtoan id_nguoidung
//show All Đơn Hàng 
Route::get("/showAllDonHang", function () {
    $donHang = donhang::with('nguoidung')->get();
    return response()->json($donHang);
});
//Thêm Đơn Hàng
Route::post("/addDonHang", function (Request $request) {
    $request->validate([
        'tong' => 'required|string|max:255',
        'trangthai' => 'required|string|max:255',
        'phuongthucthanhtoan' => 'required|string|max:255',
        'id_nguoidung' => 'required|integer',
    ]);

    $donHang = donhang::create($request->all());
    return response()->json($donHang, 201);
});
//Xóa Đơn Hàng
Route::delete("/deleteDonHang/{donHangId}", function ($donHangId) {
    $donHang = donhang::find($donHangId);
    if (!$donHang) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng'], 404);
    }

    $donHang->delete();

    return response()->json([
        'message' => 'Xóa đơn hàng thành công',
    ]);
});
//Sửa Đơn Hàng
Route::put("/updateDonHang/{donHangId}", function (Request $request, $donHangId) {
    $donHang = donhang::find($donHangId);
    if (!$donHang) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng'], 404);
    }

    $donHang->update($request->all());

    return response()->json([
        'message' => 'Cập nhật đơn hàng thành công',
    ]);
});

//don hang chi tiet id gia giamgia  id_donhang id_khoahoc

//show All Đơn Hàng Chi Tiết
Route::get("/showAllDonHangChiTiet", function () {
    $donHangChiTiet = donhangchitiet::with(['donhang', 'khoahoc'])->get();
    return response()->json($donHangChiTiet);
});
//Thêm Đơn Hàng Chi Tiết
Route::post("/addDonHangChiTiet", function (Request $request) {
    $request->validate([
        'gia' => 'required|string|max:255',
        'giamgia' => 'required|integer',
        'id_donhang' => 'required|integer',
        'id_khoahoc' => 'required|integer',
    ]);

    $donHangChiTiet = donhangchitiet::create($request->all());
    return response()->json($donHangChiTiet, 201);
});
//Xóa Đơn Hàng Chi Tiết
Route::delete("/deleteDonHangChiTiet/{donHangChiTietId}", function ($donHangChiTietId) {
    $donHangChiTiet = donhangchitiet::find($donHangChiTietId);
    if (!$donHangChiTiet) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng chi tiết'], 404);
    }

    $donHangChiTiet->delete();

    return response()->json([
        'message' => 'Xóa đơn hàng chi tiết thành công',
    ]);
});
//Sửa Đơn Hàng Chi Tiết
Route::put("/updateDonHangChiTiet/{donHangChiTietId}", function (Request $request, $donHangChiTietId) {
    $donHangChiTiet = donhangchitiet::find($donHangChiTietId);
    if (!$donHangChiTiet) {
        return response()->json(['error' => 'Không tìm thấy đơn hàng chi tiết'], 404);
    }

    $donHangChiTiet->update($request->all());

    return response()->json([
        'message' => 'Cập nhật đơn hàng chi tiết thành công',
    ]);
});


//doanh thu id tong gia giamgia trangthai id_giangvien  id_khoahoc
//show All Doanh Thu
Route::get("/showAllDoanhThu", function () {
    $doanhThu = DoanhThu::with(['giangvien', 'khoahocs'])->get();
    return response()->json($doanhThu);
});
//Thêm Doanh Thu
Route::post("/addDoanhThu", function (Request $request) {
    $request->validate([
        'tong' => 'required|string|max:255',
        'gia' => 'required|string|max:255',
        'giamgia' => 'required|string|max:255',
        'trangthai' => 'required|string|max:255',
        'id_giangvien' => 'required|integer',
        'id_khoahoc' => 'required|integer',
    ]);

    $doanhThu = DoanhThu::create($request->all());
    return response()->json($doanhThu, 201);
});
//Xóa Doanh Thu
Route::delete("/deleteDoanhThu/{doanhThuId}", function ($doanhThuId) {
    $doanhThu = DoanhThu::find($doanhThuId);
    if (!$doanhThu) {
        return response()->json(['error' => 'Không tìm thấy doanh thu'], 404);
    }

    $doanhThu->delete();

    return response()->json([
        'message' => 'Xóa doanh thu thành công',
    ]);
});
//Sửa Doanh Thu
Route::put("/updateDoanhThu/{doanhThuId}", function (Request $request, $doanhThuId) {
    $doanhThu = DoanhThu::find($doanhThuId);
    if (!$doanhThu) {
        return response()->json(['error' => 'Không tìm thấy doanh thu'], 404);
    }

    $doanhThu->update($request->all());

    return response()->json([
        'message' => 'Cập nhật doanh thu thành công',
    ]);
});

//so luong dang ky id soluong id_khoahoc id_giangvien
//show All Số Lượng Đăng Ký
Route::get("/showAllSoLuongDangKy", function () {
    $soLuongDangKy = SoLuongDangKy::with(['giangvien', 'khoahocs'])->get();
    return response()->json($soLuongDangKy);
});
//Thêm Số Lượng Đăng Ký
Route::post("/addSoLuongDangKy", function (Request $request) {
    $request->validate([
        'soluong' => 'required|string|max:255',
        'id_khoahoc' => 'required|integer',
        'id_giangvien' => 'required|integer',
    ]);
     
    $soLuongDangKy = SoLuongDangKy::create($request->all());
    return response()->json($soLuongDangKy, 201);
});
//Xóa Số Lượng Đăng Ký
Route::delete("/deleteSoLuongDangKy/{soLuongDangKyId}", function ($soLuongDangKyId) {
    $soLuongDangKy = SoLuongDangKy::find($soLuongDangKyId);
    if (!$soLuongDangKy) {
        return response()->json(['error' => 'Không tìm thấy số lượng đăng ký'], 404);
    }
    return response()->json([
        'message' => 'Xóa số lượng đăng ký thành công',
    ]);
});
//Sửa Số Lượng Đăng Ký
Route::put("/updateSoLuongDangKy/{soLuongDangKyId}", function  (Request $request, $soLuongDangKyId) {
    $soLuongDangKy = SoLuongDangKy::find($soLuongDangKyId);
    if (!$soLuongDangKy) {
        return response()->json(['error' => 'Không tìm thấy số lượng đăng ký'], 404);
    }
    $soLuongDangKy->update($request->all());
    return response()->json([
        'message' => 'Cập nhật số lượng đăng ký thành công',
    ]);
});










    //chỉnh sửa code
    Route::get("/source/api", function () {
        $path = app_path('/../routes/api.php');
        if (file_exists($path)) {
            // Read the file content
            $fileContent = file_get_contents($path);
            return new EditCodeApi(null, $fileContent);
        }
        return response()->json(['error' => 'File không tồn tại.'], 404);
    });
    Route::post("/source/api", function (Request $request) {
        $path = app_path('/../routes/api.php');
        if (file_exists($path)) {
            // Ghi nội dung mới vào file
            $fileContent = file_put_contents($path, $request->input('content'));
            return new EditCodeApi(null, $fileContent);
        }
        return response()->json(['error' => 'File không tồn tại.'], 404);
    });


});