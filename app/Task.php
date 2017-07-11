<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
    * Get the project that owns the task.
    */
   public function project()
   {
       return $this->belongsTo('App\Project');
   }
}
