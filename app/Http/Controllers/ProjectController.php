<?php

namespace App\Http\Controllers;

use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Responses\JsonResponse;
use Validator;
use App\User ;
use App\Project;
use App\Task;

class ProjectController extends Controller
{
    /**
     *  Remove link from user and task
     *
     * @param String $projectId
     * @return \Illuminate\Http\JsonResponse
     */
    private function detachUsersFromTask($projectId){
      $tasks = Task::where('project_id',$projectId)->get();
      foreach ($tasks as $task) {
        $task->users()->detach();
      }
    }

    /**
     *  API delete project with given id
     *
     * @param String $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id){
      $project  = Project::find($id);
      $user = UserController::getUser();

      // check if project exist
      if (!isset($project))
        return JsonResponse::projectNotFound();

      // check if user is project owner
      if (strcmp($user->id, $project->user_id) !== 0){
        return JsonResponse::notProjectOwner();
      }

      // detach user from task (pivot table)
      $this->detachUsersFromTask($project->id);

      // delete project
      $project->delete();

      return response()->json(['success']);

    }
    /**
      * API returns all user projects
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function all(){
      $user = UserController::getUser();
      if (isset($user)){
        $projects = $user->projects()->get();
        return response()->json($projects);
      }
    }

    /**
    * Mapping the request to create and save the task model (No checking)
    *
    * @param Array $taskObject
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
      $validator = Validator::make(['user_id'=>$userId, 'task_id'=>$taskId], [
           'user_id' => 'required|exists:users,id',
           'task_id' => 'required|exists:tasks,id',
      ]);
      if ($validator->fails())
        return false ;
      else {
        $user = User::find($userId);
        $user->tasks()->attach($taskId);
        return true ;
      }
    }
    /**
     *  Map the request and return project
     *
     * @param Request $request
     * @param String $userId
     * @return App\Project
     */
    private function mapProject(Request $request, $userId){
      $project = new Project();
      $project->name = $request->name;
      $project->description = $request->description;
      $project->deadline = $request->deadline;
      $project->user_id = $userId ;
      return $project;
    }
    /**
      * Saving the request to create the project model (No checking)
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
        // save project
        $project = $this->mapProject($request, $userId);
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
    public function new(Request $request){
      //get the current user
      $user = UserController::getUser();

      if (isset($user))
          return response()->json($this->saveProject($request, $user->id));
    }

}
