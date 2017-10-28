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

      return JsonResponse::success();

    }

    /**
     *  API update project with given id
     *
     * @param String $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id){
      $project  = Project::find($id);
      $user = UserController::getUser();

      // check if project exist
      if (!isset($project))
        return JsonResponse::projectNotFound();

      // check if user is project owner
      if (strcmp($user->id, $project->user_id) !== 0){
        return JsonResponse::notProjectOwner();
      }

      // update project
      $project->name = $request->name;
      $project->description = $request->description;
      $project->deadline = $request->deadline;
      $project->save();

      return JsonResponse::success();
    }

    /**
     *  API update project with given id
     *
     * @param String $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id){
      $project  = Project::find($id);
      $user = UserController::getUser();

      // check if project exist
      if (!isset($project))
        return JsonResponse::projectNotFound();

      // check if user is project owner
      if (strcmp($user->id, $project->user_id) !== 0){
        return JsonResponse::notProjectOwner();
      }

      // update project
      $project->name = $request->name;
      $project->description = $request->description;
      $project->deadline = $request->deadline;
      $project->save();

      return JsonResponse::success();
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
     * get Project validation
     *
     * @param Request $request
     * @return validation
     */
    private function getProjectValidation(Request $request){
      // Check if the request data are complete
      $requestArray = $request->only('name', 'deadline','description','tasks');
      $validator = Validator::make($requestArray, [
           'name' => 'required|max:255',
           'deadline' => 'required|max:255',
           'description' => 'required'
      ]);
      return $validator;
    }

    /**
     * API Saving the request to create the project model (No checking)
     *
     * @param Request $request
     * @param String $userId
     * @return Array
     */
    private function saveProject(Request $request, $userId){
      $validator = $this->getProjectValidation($request);
      if ($validator->fails())
        return $validator->errors();
      else {
        // save project
        $project = $this->mapProject($request, $userId);
        $project->save();

        // saving the tasks
        $tasks = [];
        foreach ($request->tasks as $task) {
          TaskContoller::saveTask($task, $project->id);
        }
        return JsonResponse::success();
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

      if (isset($user)){
        if ($this->saveProject($request, $user->id))
          return JsonResponse::success();
        else
          return JsonResponse::newProjectError();
      }
    }

    /**
      * API returns project with given id
      *
      * @param String $id
      * @return \Illuminate\Http\JsonResponse
      */
    public function get( $id ){
      $project  = Project::find($id);
      $user = UserController::getUser();

      // check if project exist
      if (!isset($project))
        return JsonResponse::projectNotFound();

      // check if user is project owner
      if (strcmp($user->id, $project->user_id) !== 0){
        return JsonResponse::notProjectOwner();
      }

      // Affect task array
      $project['tasks'] = $project->tasks;

      // return project
      return response()->json($project);
    }


}
