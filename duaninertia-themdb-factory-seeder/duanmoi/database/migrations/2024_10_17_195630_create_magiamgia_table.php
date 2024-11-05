<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMagiamgiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('magiamgia', function (Blueprint $table) {
            $table->id(); 
            $table->string('maso', 11);
            $table->integer('giamgia');
            $table->integer('luotsudung');
            $table->integer('sudunghientai');
            $table->enum('trangthai', ["Đợi Duyệt", "Đã Duyệt", "Chưa Duyệt"])->default("Chưa Duyệt");
            $table->date('ngaybatdau');
            $table->date('ngayketthuc');
            $table->integer('id_giangvien');
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
        Schema::dropIfExists('magiamgia');
    }
}