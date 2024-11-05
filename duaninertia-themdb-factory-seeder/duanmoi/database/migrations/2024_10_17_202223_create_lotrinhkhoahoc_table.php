<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('lotrinhkhoahoc')) {
            Schema::create('lotrinhkhoahoc', function (Blueprint $table) {
                $table->id();
                $table->string('ten')->nullable();
                $table->text('mota')->nullable();
                $table->string('hinh')->nullable();
                $table->unsignedBigInteger('id_lotrinhkhoahoc')->nullable();
                $table->unsignedBigInteger('id_khoahoc')->nullable();
                $table->foreign('id_lotrinhkhoahoc')->references('id')->on('lotrinhkhoahoc')->onDelete('cascade');
                $table->timestamps();
            });

            Schema::table('lotrinhkhoahoc', function (Blueprint $table) {
                $table->foreign('id_khoahoc', 'lotrinhkhoahoc_id_khoahoc_foreign')
                      ->references('id')->on('khoahoc')
                      ->onDelete('cascade')
                      ->nullable();
            });
            
        }

    }

    public function down(): void
    {
        // Check if the table exists before trying to drop the foreign key
        if (Schema::hasTable('lotrinhkhoahoc')) {
            Schema::table('lotrinhkhoahoc', function (Blueprint $table) {
                // Check if the foreign key exists before dropping it
                $foreignKeys = DB::select("SHOW KEYS FROM lotrinhkhoahoc WHERE Key_name = 'lotrinhkhoahoc_id_khoahoc_foreign'");
                if (!empty($foreignKeys)) {
                    $table->dropForeign(['id_khoahoc']);
                }
            });

            Schema::dropIfExists('lotrinhkhoahoc');
        }
    }
};