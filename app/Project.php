<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
    * Get the tasks for the project.
    */
   public function tasks()
   {
       return $this->hasMany('App\Task');
   }
}
