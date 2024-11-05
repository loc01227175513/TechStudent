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
        Schema::create('theodoi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_nguoidung')
                  ->constrained('nguoidung')
                  ->onDelete('cascade');
            $table->foreignId('id_giangvien')
                  ->constrained('giangvien')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theodoi');
    }
};