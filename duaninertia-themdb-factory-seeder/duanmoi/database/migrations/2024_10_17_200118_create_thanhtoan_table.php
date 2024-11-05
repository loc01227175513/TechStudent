<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateThanhtoanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thanhtoan', function (Blueprint $table) {
            $table->id(); 
            $table->integer('tong');
            $table->enum('trangthai', ['Đã Thanh Toán', 'Đã Hoàn Tiền'])->default('Đã Thanh Toán');
            $table->integer('id_khoahoc');
            $table->integer('id_nguoidung');
            $table->timestamps();
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thanhtoan');
    }
}