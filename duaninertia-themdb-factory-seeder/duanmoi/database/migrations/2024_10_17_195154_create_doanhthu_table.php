<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoanhthuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doanhthu', function (Blueprint $table) {
            $table->id(); 
            $table->integer('tong');
            $table->integer('gia');
            $table->integer('giamgia');
            $table->enum('trangthai', ['Đã Thanh Toán'])->default('Đã Thanh Toán');
            $table->integer('id_giangvien');
            $table->integer('id_khoahoc');
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
        Schema::dropIfExists('doanhthu');
    }
}