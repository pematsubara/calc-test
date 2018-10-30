<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Api\AuthController@login');
Route::post('refresh', 'Api\AuthController@refresh');
Route::post('create', 'Api\AuthController@create');

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('me', 'Api\AuthController@me');
    Route::get('logout', 'Api\AuthController@logout');
    Route::ApiResource('user', 'Api\AuthController', ['except' => 'index', 'create', 'edit']);

    Route::post('enterfamily', 'FamilyController@getFamily');
    Route::ApiResource('family', 'FamilyController', ['except' => 'index', 'create', 'edit']);
    Route::ApiResource('task', 'TaskController', ['except' => 'index', 'create', 'edit']);
    Route::ApiResource('log', 'LogController', ['except' => 'show', 'create', 'edit']);
});



