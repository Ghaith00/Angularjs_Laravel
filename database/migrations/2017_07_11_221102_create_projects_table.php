<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->text('description');
            $table->timestamp('deadline');
            $table->timestamps();
        });
        Schema::create('project_task', function (Blueprint $table) {
            $table->integer('task_id');
            $table->integer('project_id');
            $table->primary(['project_id','task_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('projects');
        Schema::drop('project_task');
    }
}
