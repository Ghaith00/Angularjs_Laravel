<?php

namespace App\Http\Controllers;

use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User ;

class AuthController extends Controller
{
  /**
  * API Login, on success return JWT Auth token
  *
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function login(Request $request) {
      $credentials = $request->only('email', 'password');
      try {
          // attempt to verify the credentials and create a token for the user
          if (! $token = JWTAuth::attempt($credentials)) {
              return response()->json(['error' => 'Invalid credentials'], 200);
          }
      } catch (JWTException $e) {
          // something went wrong whilst attempting to encode the token
          return response()->json(['error' => 'could_not_create_token'], 500);
      }

      // all good so return the token
      return response()->json(compact('token'));
  }


  /**
  * 	API signup , then login and return JWT Auth token
  *
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function signup(Request $request){
  	$credentials = $request->only('name','lastname','email','username','password');
  	$validator = Validator::make($credentials, [
          'name' => 'required|max:255',
          'lastname' => 'required|max:255',
          'username' => 'required|unique:users',
          'email' => 'required|unique:users|email',
          'password' => 'required'
      ]);

      if ($validator->fails()) {
      	$response = array('error' => $validator->errors()->all() );
          return response()->json($response);

      } else {
      	$user = new User;
    		$user->name = $credentials['name'] ;
        $user->lastname = $credentials['lastname'] ;
    		$user->email = $credentials['email'] ;
        $user->username = $credentials['username'] ;
    		$user->password = bcrypt($credentials['password']);
    		$user->save();
    		return response()->json(array('success'));
      };
  }

  /**
   * Log out
   * Invalidate the token, so user cannot use it anymore
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout(Request $request) {
  	$credentials = $request->only('token');
  	$validator = Validator::make($credentials, [
          'token' => 'required'
    ]);

    if ($validator->fails()){
        return response()->json(['error']);
    } else {
        JWTAuth::invalidate($credentials['token']);
        return response()->json(['success']);
    }
  }
}
