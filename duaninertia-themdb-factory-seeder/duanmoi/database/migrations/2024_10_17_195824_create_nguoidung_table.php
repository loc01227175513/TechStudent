<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateNguoidungTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nguoidung', function (Blueprint $table) {
            $table->id();
            $table->string('ten');
            $table->string('email')->unique();
            $table->string('dienthoai', 20); // Change to VARCHAR with length 20
            $table->string('hinh')->nullable();
            $table->string('matkhau');
            $table->enum("trangthai", ["active", "inactive"])->default("active");
            $table->tinyInteger("vaitro")->default(0);
            $table->timestamps();
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

        // Check if the foreign key constraint exists before attempting to drop it
        $foreignKeyExists = DB::select("
            SELECT CONSTRAINT_NAME 
            FROM information_schema.TABLE_CONSTRAINTS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'donhang' 
            AND CONSTRAINT_TYPE = 'FOREIGN KEY' 
            AND CONSTRAINT_NAME = 'donhang_id_nguoidung_foreign'
        ");

        if (!empty($foreignKeyExists)) {
            DB::statement('ALTER TABLE donhang DROP FOREIGN KEY donhang_id_nguoidung_foreign');
        }

        // Delete related records in the donhang table
        DB::table('donhang')->whereNotNull('id_nguoidung')->delete();

        // Now drop the nguoidung table
        Schema::dropIfExists('nguoidung');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}