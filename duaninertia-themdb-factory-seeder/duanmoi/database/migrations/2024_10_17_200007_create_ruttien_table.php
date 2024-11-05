<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRuttienTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ruttien', function (Blueprint $table) {
            $table->id(); 
            $table->integer('tong');
            $table->integer('id_giangvien');
            $table->integer('id_thenganhang');
            $table->enum('trangthai', ['choxuly', 'daxuly', 'tuchoi'])->default('choxuly');
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
        Schema::dropIfExists('ruttien');
    }
}