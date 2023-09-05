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
        Schema::create('renditions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('width');
            $table->integer('height');
            $table->string('aspect');
            $table->json('coords');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('renditions');
    }
};
