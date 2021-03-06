<?php
  namespace App\Responses;
  use Illuminate\Http\Request;
  use Validator;
  use App\User ;
  use App\Project;
  use App\Task;

  class JsonResponse
  {

    /**
     * prepare response object
     *
     * @return Object
     */
    private static function format(){
      return (object)['success'=>false,'error'=>false,'code' => 'none'];
    }

    /**
     *  construct "not found project" error response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public static function projectNotFound(){
      $response = self::format();
      $response->error = true;
      $response->code = 'project_not_found';
      return response()->json($response);
    }
    
    /**
     *  construct "not project owner" error response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public static function notProjectOwner(){
      $response = self::format();
      $response->error = true;
      $response->code = 'not_project_owner';
      return response()->json($response);
    }

    /**
     * construct "success" response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public static function success(){
      $response = self::format();
      $response->success = true;
      $response->code = 'success';
      return response()->json($response);
    }

    /**
     * Construct "new project error" response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public static function newProjectError(){
      $response = self::format();
      $response->error = true;
      $response->code = 'new_project_error';
      return response()->json($response);
    }
  }
