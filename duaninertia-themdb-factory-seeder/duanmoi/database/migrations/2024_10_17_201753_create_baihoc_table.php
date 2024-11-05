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
        Schema::create('baihoc', function (Blueprint $table) {
            $table->id(); // This automatically creates an auto-incrementing primary key
            $table->string('ten', 255);
            $table->unsignedBigInteger('id_khoahoc'); // Ensure this matches the type of the referenced column
            $table->integer('order')->default(0);
            $table->string('mota', 225)->nullable();
            $table->timestamps(); // This will create both 'created_at' and 'updated_at' columns
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('baihoc');
    }
};