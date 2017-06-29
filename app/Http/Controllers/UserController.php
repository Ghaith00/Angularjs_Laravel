<?php

namespace App\Http\Controllers;

use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User ;

class UserController extends Controller
{
  /**
   * Get user info from its id
   *
   * @param String $id
   * @return \Illuminate\Http\JsonResponse
   */
  public function info($id){
      $user = User::find($id);
      if (isset($user))
        return response()->json($user);
      else
        return response()->json(['error' => 'User not found'],404);
  }

  /**
   * Get user info from the JWT token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function state(){
      $user = JWTAuth::parseToken()->authenticate();
      if ((isset($user))) return response()->json($user);
      else response()->json(['error' => 'Unauthorized'],403);
  }
}
