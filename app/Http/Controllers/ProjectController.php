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

class ProjectController extends Controller
{
    /**
    * API returns all user projects
    *
    * @return \Illuminate\Http\JsonResponse
    */
    public function projects(){
      $user = UserController::getUser();
      if (isset($user)){
        $projects = $user->projects();
        return response()->json($projects);
      }
    }

    /**
    * Mapping the request to create and save the task model (No checking)
    *
    * @param Array $taskObjec
    * @param String $projectId
    * @return Boolean
    */
    private function saveTask(Array $taskObject, $projectId){
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
    /**
    * link the user to task
    *
    * @param String $userId
    * @param String $taskId
    * @return Boolean
    */
    public function linkUserToTask($userId, $taskId){
      // Check if the request data are complete
      /*$validator = Validator::make(['user_id'=>$userId, 'task_id'=>$taskId], [
           'user_id' => 'required|exists:users,id',
           'task_id' => 'required|exists:tasks,id',
      ]);
      if ($validator->fails())
        return false ;
      else {*/
        $user = User::find("1");
        $user->tasks()->attach($taskId);
        return true ;
      //}
    }

    /**
    * Mapping and saving the request to create the project model (No checking)
    *
    * @param Request $request
    * @param String $userId
    * @return Array
    */
    private function saveProject(Request $request, $userId){
      // Check if the request data are complete
      $requestArray = $request->only('name', 'deadline','description','tasks');
      $validator = Validator::make($requestArray, [
           'name' => 'required|max:255',
           'deadline' => 'required|max:255',
           'description' => 'required'
      ]);

      if ($validator->fails())
        return $validator->errors();
      else {
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->deadline = $request->deadline;
        $project->user_id = $userId ;
        $project->save();

        // saving the tasks
        $tasks = [];
        foreach ($request->tasks as $task) {
          $this->saveTask($task, $project->id);
        }

        return ['success'];
      }
    }

    /**
    *  Create a new project
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
    public function newProject(Request $request){
      //get the current user
      $user = UserController::getUser();

      if (isset($user))
          return response()->json($this->saveProject($request, $user->id));
    }

}
