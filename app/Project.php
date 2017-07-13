<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
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
    * Get the tasks for the project.
    */
   public function tasks()
   {
       return $this->hasMany('App\Task');
   }

    /**
     * Get the user that owns the project.
     */
    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
