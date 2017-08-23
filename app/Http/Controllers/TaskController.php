<?php

namespace App\Http\Controllers;

use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User ;
use App\Project;
use App\Task;

class TaskController extends Controller
{
  /**
  * Mapping the request to create and save the task model (No checking)
  *
  * @param Array $taskObject
  * @param String $projectId
  * @return Boolean
  */
  public function saveTask(Array $taskObject, $projectId){
    // Check if the request data are complete
    $validator = Validator::make($taskObject, [
        'name' => 'required|max:255',
        'deadline' => 'required|max:255',
        'description' => 'required',
    ]);
    if ($validator->fails())
     return false ;
    else {
     $task = new Task();
     $task->name = $taskObject['name'] ;
     $task->description = $taskObject['description'] ;
     $task->deadline = $taskObject['deadline'] ;
     $task->project_id = $projectId;
     $task->save();
     if (!empty($taskObject['users'])){
       //link the users to the task
       foreach ($taskObject['users'] as $userId) {
          $this->linkUserToTask($userId, $task->id);
       }
     }
     return true ;
    }
  }

}
