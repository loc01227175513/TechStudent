<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateGiangvienTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('giangvien', function (Blueprint $table) {
            $table->id();
            $table->string('ten')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('dienthoai', 20)->nullable(); // Increase length to 20 characters
            $table->unsignedBigInteger('id_nguoidung');
            $table->string("password")->nullable();
            $table->text('tieusu')->nullable();
            $table->string('hinh')->nullable();
            $table->decimal('tongdoanhthu', 15, 2)->default(0);
            $table->decimal('sodukhadung', 15, 2)->default(0);
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
            AND TABLE_NAME = 'giangvien' 
            AND CONSTRAINT_TYPE = 'FOREIGN KEY'
        ");

        foreach ($foreignKeys as $foreignKey) {
            DB::statement("ALTER TABLE giangvien DROP FOREIGN KEY {$foreignKey->CONSTRAINT_NAME}");
        }

        // Delete related records in the giangvien table
        DB::table('giangvien')->delete();

        // Now drop the giangvien table
        Schema::dropIfExists('giangvien');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}