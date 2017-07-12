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
      $projects = $user->projects();
      return response()->json($projects);
  }
}
