<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterTablesAddKeysAndConstraints extends Migration
{
    public function up()
    {
        $this->addForeignKeysToBaihoc();
        $this->addForeignKeysToBangcap();
        $this->addForeignKeysToChude();
        $this->addForeignKeysToChungchi();
        $this->addForeignKeysToDanhgia();
        $this->addForeignKeysToDoanhthu();
        $this->addForeignKeysToDonhang();
        $this->addForeignKeysToDonhangchitiet();
        $this->addForeignKeysToGiangvien();
        $this->addForeignKeysToGiohang();
        $this->addForeignKeysToKhoahoc();
        $this->addForeignKeysToKhoahocdahoc();
        $this->addForeignKeysToMagiamgia();
        $this->addForeignKeysToMagiamgiakhoahoc();
        $this->addForeignKeysToMangxahoi();
        $this->addForeignKeysToNguoidungmagiamgia();
        $this->addForeignKeysToNhantin();
        $this->addForeignKeysToRuttien();
        $this->addForeignKeysToSoluongdangky();
        $this->addForeignKeysToThanhtoan();

        $this->addForeignKeysToThoiluongvideo();
        $this->addForeignKeysToTinnhan();
        $this->addForeignKeysToTracnghiem();
        $this->addForeignKeysToTrinhdo();
        $this->addForeignKeysToVideo();
        $this->addForeignKeysToVideodahoc();
    }

    private function addForeignKeysToBaihoc()
    {
        Schema::table('baihoc', function (Blueprint $table) {
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToBangcap()
    {
        Schema::table('bangcap', function (Blueprint $table) {
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
        });
    }

    private function addForeignKeysToChude()
    {
        Schema::table('chude', function (Blueprint $table) {
            $table->unsignedBigInteger('id_theloaicon')->change();
            $table->foreign('id_theloaicon')->references('id')->on('theloai_theloaicon')->onDelete('cascade');
        });
    }

    private function addForeignKeysToChungchi()
    {
        Schema::table('chungchi', function (Blueprint $table) {
            $table->unsignedBigInteger('id_khoahoc')->nullable()->change();
            $table->unsignedBigInteger('id_nguoidung')->nullable()->change();
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToDanhgia()
    {
        Schema::table('danhgia', function (Blueprint $table) {
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToDoanhthu()
    {
        Schema::table('doanhthu', function (Blueprint $table) {
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
        });
    }

    private function addForeignKeysToDonhang()
    {
        Schema::table('donhang', function (Blueprint $table) {
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToDonhangchitiet()
    {
        Schema::table('donhangchitiet', function (Blueprint $table) {
            $table->unsignedBigInteger('id_donhang')->change();
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->foreign('id_donhang')->references('id')->on('donhang')->onDelete('cascade');
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToGiangvien()
    {
        Schema::table('giangvien', function (Blueprint $table) {
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToGiohang()
    {
        Schema::table('giohang', function (Blueprint $table) {
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToKhoahoc()
    {
        Schema::table('khoahoc', function (Blueprint $table) {
            $table->unsignedBigInteger('id_chude')->nullable()->change();
            $table->unsignedBigInteger('id_giangvien')->nullable()->change();
            $table->unsignedBigInteger('id_theloaicon')->nullable()->change();
            $table->unsignedBigInteger('id_theloai')->nullable()->change();
            $table->foreign('id_chude')->references('id')->on('chude')->onDelete('cascade');
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
            $table->foreign('id_theloaicon')->references('id')->on('theloai_theloaicon')->onDelete('cascade');
            $table->foreign('id_theloai')->references('id')->on('theloai_theloaicon')->onDelete('cascade');
        });
    }

    private function addForeignKeysToKhoahocdahoc()
    {
        Schema::table('khoahocdahoc', function (Blueprint $table) {
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToMagiamgia()
    {
        Schema::table('magiamgia', function (Blueprint $table) {
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
        });
    }

    private function addForeignKeysToMagiamgiakhoahoc()
    {
        Schema::table('magiamgiakhoahoc', function (Blueprint $table) {
            $table->unsignedBigInteger('id_magiamgia')->change();
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->foreign('id_magiamgia')->references('id')->on('magiamgia')->onDelete('cascade');
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToMangxahoi()
    {
        Schema::table('mangxahoi', function (Blueprint $table) {
            $table->unsignedBigInteger('id_nguoidung')->nullable()->change();
            $table->unsignedBigInteger('id_giangvien')->nullable()->change();
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
        });
    }

    private function addForeignKeysToNguoidungmagiamgia()
    {
        Schema::table('nguoidungmagiamgia', function (Blueprint $table) {
            $table->unsignedBigInteger('id_magiamgia')->change();
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_magiamgia')->references('id')->on('magiamgia')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToNhantin()
    {
        Schema::table('nhantin', function (Blueprint $table) {
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
        });
    }

    private function addForeignKeysToRuttien()
    {
        Schema::table('ruttien', function (Blueprint $table) {
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->unsignedBigInteger('id_thenganhang')->change();
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
            $table->foreign('id_thenganhang')->references('id')->on('thenganhang')->onDelete('cascade');
        });
    }

    private function addForeignKeysToSoluongdangky()
    {
        Schema::table('soluongdangky', function (Blueprint $table) {
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
        });
    }

    private function addForeignKeysToThanhtoan()
    {
        Schema::table('thanhtoan', function (Blueprint $table) {
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }



    private function addForeignKeysToThoiluongvideo()
    {
        Schema::table('thoiluongvideo', function (Blueprint $table) {
            $table->unsignedBigInteger('id_video')->change();
            $table->foreign('id_video')->references('id')->on('video')->onDelete('cascade');
        });
    }

    private function addForeignKeysToTinnhan()
    {
        Schema::table('tinnhan', function (Blueprint $table) {
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    private function addForeignKeysToTracnghiem()
    {
        Schema::table('tracnghiem', function (Blueprint $table) {
            $table->unsignedBigInteger('id_baihoc')->change();
            $table->foreign('id_baihoc')->references('id')->on('baihoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToTrinhdo()
    {
        Schema::table('trinhdo', function (Blueprint $table) {
            $table->unsignedBigInteger('id_giangvien')->change();
            $table->unsignedBigInteger('id_khoahoc')->change();
            $table->foreign('id_giangvien')->references('id')->on('giangvien')->onDelete('cascade');
            $table->foreign('id_khoahoc')->references('id')->on('khoahoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToVideo()
    {
        Schema::table('video', function (Blueprint $table) {
            $table->unsignedBigInteger('id_baihoc')->change();
            $table->foreign('id_baihoc')->references('id')->on('baihoc')->onDelete('cascade');
        });
    }

    private function addForeignKeysToVideodahoc()
    {
        Schema::table('videodahoc', function (Blueprint $table) {
            $table->unsignedBigInteger('id_video')->change();
            $table->unsignedBigInteger('id_nguoidung')->change();
            $table->foreign('id_video')->references('id')->on('video')->onDelete('cascade');
            $table->foreign('id_nguoidung')->references('id')->on('nguoidung')->onDelete('cascade');
        });
    }

    public function down()
    {
        $this->dropForeignKeysFromVideodahoc();
        $this->dropForeignKeysFromVideo();
        $this->dropForeignKeysFromTrinhdo();
        $this->dropForeignKeysFromTracnghiem();
        $this->dropForeignKeysFromTinnhan();
        $this->dropForeignKeysFromThoiluongvideo();
        $this->dropForeignKeysFromTheloaiTheloaicon();
        $this->dropForeignKeysFromThanhtoan();
        $this->dropForeignKeysFromSoluongdangky();
        $this->dropForeignKeysFromRuttien();
        $this->dropForeignKeysFromNhantin();
        $this->dropForeignKeysFromNguoidungmagiamgia();
        $this->dropForeignKeysFromMangxahoi();
        $this->dropForeignKeysFromMagiamgiakhoahoc();
        $this->dropForeignKeysFromMagiamgia();
        $this->dropForeignKeysFromKhoahocdahoc();
        $this->dropForeignKeysFromKhoahoc();
        $this->dropForeignKeysFromGiohang();
        $this->dropForeignKeysFromGiangvien();
        $this->dropForeignKeysFromDonhangchitiet();
        $this->dropForeignKeysFromDonhang();
        $this->dropForeignKeysFromDoanhthu();
        $this->dropForeignKeysFromDanhgia();
        $this->dropForeignKeysFromChungchi();
        $this->dropForeignKeysFromChude();
        $this->dropForeignKeysFromBangcap();
        $this->dropForeignKeysFromBaihoc();
        $this->dropForeignKeysFromThenganhang();
    }

    private function dropForeignKeysFromBaihoc()
    {
        if (Schema::hasTable('baihoc')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'baihoc'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'baihoc_id_khoahoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('baihoc', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc']);
                });
            }
        }
    }
    private function dropForeignKeysFromThenganhang()
    {
        if (Schema::hasTable('thenganhang')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'thenganhang'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'thenganhang_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('thenganhang', function (Blueprint $table) {
                    $table->dropForeign(['id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromBangcap()
    {
        if (Schema::hasTable('bangcap')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'bangcap'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'bangcap_id_giangvien_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('bangcap', function (Blueprint $table) {
                    $table->dropForeign(['id_giangvien']);
                });
            }
        }
    }

    private function dropForeignKeysFromChude()
    {
        if (Schema::hasTable('chude')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'chude'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'chude_id_theloaicon_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('chude', function (Blueprint $table) {
                    $table->dropForeign(['id_theloaicon']);
                });
            }
        }
    }

    private function dropForeignKeysFromChungchi()
    {
        if (Schema::hasTable('chungchi')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'chungchi'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'chungchi_id_khoahoc_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('chungchi', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromDanhgia()
    {
        if (Schema::hasTable('danhgia')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'danhgia'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'danhgia_id_khoahoc_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('danhgia', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromDoanhthu()
    {
        if (Schema::hasTable('doanhthu')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'doanhthu'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'doanhthu_id_khoahoc_id_giangvien_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('doanhthu', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc', 'id_giangvien']);
                });
            }
        }
    }

    private function dropForeignKeysFromDonhang()
    {
        if (Schema::hasTable('donhang')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'donhang'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'donhang_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('donhang', function (Blueprint $table) {
                    $table->dropForeign(['id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromDonhangchitiet()
    {
        if (Schema::hasTable('donhangchitiet')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'donhangchitiet'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'donhangchitiet_id_donhang_id_khoahoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('donhangchitiet', function (Blueprint $table) {
                    $table->dropForeign(['id_donhang', 'id_khoahoc']);
                });
            }
        }
    }

    private function dropForeignKeysFromGiangvien()
    {
        if (Schema::hasTable('giangvien')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'giangvien'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'giangvien_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('giangvien', function (Blueprint $table) {
                    $table->dropForeign(['id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromGiohang()
    {
        if (Schema::hasTable('giohang')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'giohang'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'giohang_id_khoahoc_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('giohang', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromKhoahoc()
    {
        if (Schema::hasTable('khoahoc')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'khoahoc'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'khoahoc_id_chude_id_giangvien_id_theloaicon_id_theloai_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('khoahoc', function (Blueprint $table) {
                    $table->dropForeign(['id_chude', 'id_giangvien', 'id_theloaicon', 'id_theloai']);
                });
            }
        }
    }

    private function dropForeignKeysFromKhoahocdahoc()
    {
        if (Schema::hasTable('khoahocdahoc')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'khoahocdahoc'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'khoahocdahoc_id_nguoidung_id_khoahoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('khoahocdahoc', function (Blueprint $table) {
                    $table->dropForeign(['id_nguoidung', 'id_khoahoc']);
                });
            }
        }
    }

    private function dropForeignKeysFromMagiamgia()
    {
        if (Schema::hasTable('magiamgia')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'magiamgia'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'magiamgia_id_giangvien_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('magiamgia', function (Blueprint $table) {
                    $table->dropForeign(['id_giangvien']);
                });
            }
        }
    }

    private function dropForeignKeysFromMagiamgiakhoahoc()
    {
        if (Schema::hasTable('magiamgiakhoahoc')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'magiamgiakhoahoc'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'magiamgiakhoahoc_id_magiamgia_id_khoahoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('magiamgiakhoahoc', function (Blueprint $table) {
                    $table->dropForeign(['id_magiamgia', 'id_khoahoc']);
                });
            }
        }
    }

    private function dropForeignKeysFromMangxahoi()
    {
        if (Schema::hasTable('mangxahoi')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'mangxahoi'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'mangxahoi_id_nguoidung_id_giangvien_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('mangxahoi', function (Blueprint $table) {
                    $table->dropForeign(['id_nguoidung', 'id_giangvien']);
                });
            }
        }
    }

    private function dropForeignKeysFromNguoidungmagiamgia()
    {
        if (Schema::hasTable('nguoidungmagiamgia')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'nguoidungmagiamgia'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'nguoidungmagiamgia_id_magiamgia_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('nguoidungmagiamgia', function (Blueprint $table) {
                    $table->dropForeign(['id_magiamgia', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromNhantin()
    {
        if (Schema::hasTable('nhantin')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'nhantin'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'nhantin_id_nguoidung_id_giangvien_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('nhantin', function (Blueprint $table) {
                    $table->dropForeign(['id_nguoidung', 'id_giangvien']);
                });
            }
        }
    }

    private function dropForeignKeysFromRuttien()
    {
        if (Schema::hasTable('ruttien')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'ruttien'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'ruttien_id_giangvien_id_thenganhang_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('ruttien', function (Blueprint $table) {
                    $table->dropForeign(['id_giangvien', 'id_thenganhang']);
                });
            }
        }
    }

    private function dropForeignKeysFromSoluongdangky()
    {
        if (Schema::hasTable('soluongdangky')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'soluongdangky'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'soluongdangky_id_khoahoc_id_giangvien_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('soluongdangky', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc', 'id_giangvien']);
                });
            }
        }
    }

    private function dropForeignKeysFromThanhtoan()
    {
        if (Schema::hasTable('thanhtoan')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'thanhtoan'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'thanhtoan_id_khoahoc_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('thanhtoan', function (Blueprint $table) {
                    $table->dropForeign(['id_khoahoc', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromTheloaiTheloaicon()
    {
        if (Schema::hasTable('theloai_theloaicon')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'theloai_theloaicon'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'theloai_theloaicon_id_theloai_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('theloai_theloaicon', function (Blueprint $table) {
                    $table->dropForeign(['id_theloai']);
                });
            }
        }
    }

    private function dropForeignKeysFromThoiluongvideo()
    {
        if (Schema::hasTable('thoiluongvideo')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'thoiluongvideo'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'thoiluongvideo_id_video_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('thoiluongvideo', function (Blueprint $table) {
                    $table->dropForeign(['id_video']);
                });
            }
        }
    }

    private function dropForeignKeysFromTinnhan()
    {
        if (Schema::hasTable('tinnhan')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'tinnhan'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'tinnhan_id_giangvien_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('tinnhan', function (Blueprint $table) {
                    $table->dropForeign(['id_giangvien', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromTracnghiem()
    {
        if (Schema::hasTable('tracnghiem')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'tracnghiem'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'tracnghiem_id_baihoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('tracnghiem', function (Blueprint $table) {
                    $table->dropForeign(['id_baihoc']);
                });
            }
        }
    }

    private function dropForeignKeysFromTrinhdo()
    {
        if (Schema::hasTable('trinhdo')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'trinhdo'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'trinhdo_id_giangvien_id_khoahoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('trinhdo', function (Blueprint $table) {
                    $table->dropForeign(['id_giangvien', 'id_khoahoc']);
                });
            }
        }
    }


    private function dropForeignKeysFromVideodahoc()
    {
        if (Schema::hasTable('videodahoc')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'videodahoc'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'videodahoc_id_video_id_nguoidung_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('videodahoc', function (Blueprint $table) {
                    $table->dropForeign(['id_video', 'id_nguoidung']);
                });
            }
        }
    }

    private function dropForeignKeysFromVideo()
    {
        if (Schema::hasTable('video')) {
            $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'video'
            AND TABLE_SCHEMA = DATABASE()
            AND CONSTRAINT_NAME = 'video_id_baihoc_foreign'
        ");

            if (!empty($foreignKeys)) {
                Schema::table('video', function (Blueprint $table) {
                    $table->dropForeign(['id_baihoc']);
                });
            }
        }
    }
}
