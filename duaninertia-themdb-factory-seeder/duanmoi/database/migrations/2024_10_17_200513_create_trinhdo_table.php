<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrinhdoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trinhdo', function (Blueprint $table) {
            $table->id(); 
            $table->enum('ten', ['Trình độ sơ cấp', 'Trình độ trung cấp', 'Cấp độ chuyên gia', 'Tất cả các cấp độ'])->default('Trình độ sơ cấp');
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
        Schema::dropIfExists('trinhdo');
    }
}