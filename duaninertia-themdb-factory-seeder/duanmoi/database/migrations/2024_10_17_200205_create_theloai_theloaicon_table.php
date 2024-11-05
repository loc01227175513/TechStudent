<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTheloaiTheloaiconTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        // Drop the theloai_theloaicon table if it already exists to avoid conflicts
        Schema::dropIfExists('theloai_theloaicon');

        // Create theloai_theloaicon table
        Schema::create('theloai_theloaicon', function (Blueprint $table) {
            $table->id();
            $table->string('ten');
            $table->string("hinh");
            $table->unsignedBigInteger('id_theloai')->nullable();
            $table->timestamps();

            // Ensure the referenced table and column exist and are correct
            $table->foreign('id_theloai')->references('id')->on('theloai_theloaicon')->onDelete('cascade');
          
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
            AND TABLE_NAME = 'theloai_theloaicon' 
            AND CONSTRAINT_TYPE = 'FOREIGN KEY'
        ");

        foreach ($foreignKeys as $foreignKey) {
            DB::statement("ALTER TABLE theloai_theloaicon DROP FOREIGN KEY {$foreignKey->CONSTRAINT_NAME}");
        }

        // Delete related records in the theloai_theloaicon table
        DB::table('theloai_theloaicon')->delete();

        // Now drop the theloai_theloaicon table
        Schema::dropIfExists('theloai_theloaicon');

        // Drop the theloaicon table
        Schema::dropIfExists('theloaicon');

        // Drop the theloai table
        Schema::dropIfExists('theloai');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}