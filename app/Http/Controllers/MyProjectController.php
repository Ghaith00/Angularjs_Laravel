<?php

namespace App\Http\Controllers;

use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User ;
use App\Project;

class MyProjectController extends Controller
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
      } else {
        return response()->json(["error"=>"User is not authenticated"]);
      }
  }
  /**
   * Mapping the request to create the task model (No checking)
   *
   * @param Request $request
   * @return App\Project
   */
   private function mapTask(Task $taskObject){
     // Check if the request data are complete
     $validator = Validator::make($taskObject, [
          'name' => 'required|max:255',
          'deadline' => 'required|max:255',
          'description' => 'required',
          'users' => 'required'
     ]);
     if ($validator->fails())
       return null ;
     else {
       $task = new Task();
       $task->name = $taskObject->name ;
       $task->name = $taskObject->description ;
       $task->name = $taskObject->deadline ;
       return $task ;
     }
   }

  /**
   * Mapping and saving the request to create the project model (No checking)
   *
   * @param Request $request
   * @param String $userId
   * @return Boolean
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

        //creating tasks array
        $tasks = [];
        foreach ($request->tasks as $task) {
          $tasks[] =  $this->mapTask($task);
        }
        $project->tasks()->saveMany($tasks);
        return true;
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

      if (isset($user)){
          return response()->json($this->saveProject($request, $user->id));
      } else {
          return response()->json(false);
      }
   }

}
