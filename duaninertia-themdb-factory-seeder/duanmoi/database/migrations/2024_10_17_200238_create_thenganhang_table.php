<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThenganhangTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thenganhang', function (Blueprint $table) {
            $table->id(); 
            $table->string('tenthe', 225);
            $table->string('sothe', 255)->charset('utf8mb4')->collation('utf8mb4_bin');
            $table->integer('thang', false, true)->length(2);
            $table->integer('nam', false, true)->length(4);
            $table->integer('mabaomat', false, true)->length(3);
            $table->integer('tien')->nullable();
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
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('thenganhang');
        Schema::enableForeignKeyConstraints();
    }
}