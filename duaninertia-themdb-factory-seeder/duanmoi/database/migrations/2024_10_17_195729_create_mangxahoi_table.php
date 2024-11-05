<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMangxahoiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mangxahoi', function (Blueprint $table) {
            $table->id(); 
            $table->enum('nentang', ['facebook', 'skype', 'linkedin', 'pinterest', 'github'])->default('facebook');
            $table->string('url', 255)->nullable();
            $table->integer('id_nguoidung')->nullable();
            $table->integer('id_giangvien')->nullable();
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
        Schema::dropIfExists('mangxahoi');
    }
}