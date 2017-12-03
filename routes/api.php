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

Route::namespace('Api')->middleware('auth:api')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // TIMERS

    Route::get('/timers', 'ApiTimerController@index');
    Route::get('/timers/{id}', 'ApiTimerController@view');
    Route::post('/timers', 'ApiTimerController@create');
    Route::put('/timers/{id}', 'ApiTimerController@update');
    Route::post('/timers/{id}/set/{duration}', 'ApiTimerController@setTime');
    Route::post('/timers/{id}/start', 'ApiTimerController@start');
    Route::post('/timers/{id}/restart', 'ApiTimerController@restart');
    Route::post('/timers/{id}/reset', 'ApiTimerController@reset');
    Route::post('/timers/{id}/pause', 'ApiTimerController@pause');
    Route::delete('/timers/{id}', 'ApiTimerController@delete');

});




