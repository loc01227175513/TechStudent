    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateKhoahocdahocTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('khoahocdahoc', function (Blueprint $table) {
                $table->id(); 
                $table->enum('trangthai', ['Đã Hoàn Thành'])->default('Đã Hoàn Thành');
                $table->integer('id_khoahoc');
                $table->integer('id_nguoidung');
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
            Schema::dropIfExists('khoahocdahoc');
        }
    }