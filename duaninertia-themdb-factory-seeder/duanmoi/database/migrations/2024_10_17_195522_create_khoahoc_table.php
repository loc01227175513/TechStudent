<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateKhoahocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('khoahoc', function (Blueprint $table) {
            $table->id();
            $table->string('ten', 255);
            $table->integer('gia')->nullable();
            $table->integer('giamgia')->nullable();
            $table->text('mota')->nullable();
            $table->string('hinh', 255)->nullable();
            $table->string('dieukien', 225)->nullable();
            $table->string('muctieu', 225)->nullable();
            $table->enum('trangthai', ['active', 'Notyet', 'Progress', 'Decline', 'Pending'])->default('Notyet');
            $table->integer('id_chude')->nullable();
            $table->integer('id_theloaicon')->nullable();
            $table->integer('id_theloai')->nullable();
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
        // Temporarily disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Drop the foreign key constraints if they exist
        $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME
            FROM information_schema.TABLE_CONSTRAINTS
            WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = 'khoahoc'
            AND CONSTRAINT_TYPE = 'FOREIGN KEY'
        ");

        foreach ($foreignKeys as $foreignKey) {
            DB::statement("ALTER TABLE khoahoc DROP FOREIGN KEY {$foreignKey->CONSTRAINT_NAME}");
        }

        // Delete related records in the khoahoc table
        DB::table('khoahoc')->delete();

        // Now drop the khoahoc table
        Schema::dropIfExists('khoahoc');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
