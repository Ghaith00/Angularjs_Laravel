<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description','deadline'
    ];
    /**
    * Get the project that owns the task.
    */
   public function project()
   {
       return $this->belongsTo('App\Project');
   }
}
