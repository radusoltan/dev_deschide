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
        Schema::create('image_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('image_id')
                ->references('id')
                ->on('images')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('locale')->index();
            $table->string('title')->index();
            $table->string('author')->nullable(true);
            $table->text('description')->nullable(true);
//            $table->text('body')->nullable(true);
            $table->unique(['locale','title']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_translations');
    }
};
