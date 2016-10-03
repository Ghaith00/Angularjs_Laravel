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
    return view('welcome');
});

Route::group(['prefix' => 'api'], function() {
	Route::post('emailcheck','AuthController@emailcheck');
	Route::post('usercheck','AuthController@usercheck');
    Route::post('login', 'AuthController@login');
    Route::post('signup','AuthController@signup');

    Route::group(['middleware' => 'jwt.auth'], function() {
    	// Log Out
        Route::post('logout', 'AuthController@logout');
        Route::get('user_info','AuthController@user_info');

    });
});