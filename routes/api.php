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

//Route::namespace('Api')->middleware('auth:api')->group(function () {
Route::namespace('Api')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // TIMERS

    // Authenticated Routes
    Route::get('/timers', 'ApiTimerController@index');
    Route::post('/timers', 'ApiTimerController@create');

    Route::get('/timers/{timer}', 'ApiTimerController@view');
    Route::put('/timers/{timer}', 'ApiTimerController@update');
    Route::post('/timers/{timer}/start', 'ApiTimerController@start');
    Route::post('/timers/{timer}/restart', 'ApiTimerController@start');
    Route::post('/timers/{timer}/reset', 'ApiTimerController@reset');
    Route::post('/timers/{timer}/pause', 'ApiTimerController@pause');
    Route::post('/timers/{timer}/resume', 'ApiTimerController@resume');
    Route::delete('/timers/{timer}', 'ApiTimerController@delete');

});




