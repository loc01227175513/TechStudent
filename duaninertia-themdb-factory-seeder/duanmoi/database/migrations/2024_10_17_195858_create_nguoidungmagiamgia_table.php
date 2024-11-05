<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNguoidungmagiamgiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nguoidungmagiamgia', function (Blueprint $table) {
            $table->id(); 
            $table->enum('trangthai', ['Đã sử dụng', 'Chưa sử dụng'])->default('Chưa sử dụng');
            $table->integer('dasudunghientai');
            $table->integer('id_nguoidung');
            $table->integer('id_magiamgia');
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
        Schema::dropIfExists('nguoidungmagiamgia');
    }
}