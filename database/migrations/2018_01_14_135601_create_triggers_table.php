<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTriggersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('triggers', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->unsignedInteger('timer_id');
            $table->string('name')->nullable();
            $table->string('compare_type');
            $table->integer('target_time');
            $table->longText('action_type');
            $table->string('action_parameters')->nullable();
            $table->boolean('enabled')->default(true);
            $table->foreign('timer_id')->references('id')->on('timers');
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
        Schema::dropIfExists('triggers');
    }
}
