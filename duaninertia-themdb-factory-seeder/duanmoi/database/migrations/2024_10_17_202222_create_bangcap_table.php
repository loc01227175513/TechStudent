<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('bangcap')) {
            Schema::create('bangcap', function (Blueprint $table) {
                $table->id();
                $table->string('ten');
                $table->string('url', 225);
                $table->string('tochuc', 50);
                $table->date('nam');
                $table->unsignedBigInteger('id_giangvien');
                $table->timestamps();
            });
        } else {
            Schema::table('bangcap', function (Blueprint $table) {
                // Add any necessary updates to the existing table structure here
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bangcap');
    }
};