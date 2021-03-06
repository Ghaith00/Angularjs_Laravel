<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function() {

  // check group
  Route::group(['prefix' => 'check'], function(){
    Route::post('email', 'CheckController@checkEmail');
    Route::post('username', 'CheckController@checkUsername');
  });

  // auth group
  Route::group(['prefix' => 'auth'], function(){
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::group(['middleware' => 'jwt.auth'], function() {
        Route::post('logout', 'AuthController@logout');
    });
  });
  // user group
  Route::group(['prefix' => 'user','middleware' => 'jwt.auth'], function(){
    Route::post('state', 'UserController@state');
    Route::get('info/{id}', 'UserController@info');
    Route::get('info', 'UserController@state');
  });
  // projects group
  Route::group(['prefix'=>'project','middleware'=> 'jwt.auth'], function(){
    Route::get('all', 'ProjectController@all');
    Route::put('new', 'ProjectController@new');
    Route::post('{id}/update', 'ProjectController@update');
<<<<<<< HEAD
    Route::post('{id}', 'ProjectController@get');
=======
>>>>>>> a22ca66df00d57a32d7cc3e372b544427cba4a2c
    Route::delete('{id}', 'ProjectController@delete');
  });

  /* task group
  Route::group(['prefix' => 'task', 'middleware'=> 'jwt.auth'], function(){
    Route::get('all', 'TaskContoller@all');
    Route::put('new/{project-id}', 'TaskController@new');
    Route::put('{id}/update', 'TaskController@update');
    Route::delete('{id}', 'TaskController@delete');
  });*/


});
