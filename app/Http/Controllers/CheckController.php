<?php

namespace App\Http\Controllers;

use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User ;

class CheckController extends Controller
{
  /**
  * API check email , on success return true
  *
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function checkEmail(Request $request){
      $credentials = $request->only('email');
      $validator = Validator::make($credentials, [
          'email' => 'required|unique:users'
      ]);
      return response()->json($validator->fails());
  }

  /**
  * API check username, on success return true
  *
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function checkUsername(Request $request){
      $credentials = $request->only('username');
      $validator = Validator::make($credentials, [
          'username' => 'required|unique:users'
      ]);
      return response()->json($validator->fails());
  }

}
