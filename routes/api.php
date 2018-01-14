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
    Route::get('/timers', 'ApiTimerController@index')->name('timer.index');
    Route::post('/timers', 'ApiTimerController@create')->name('timer.create');

    Route::get('/timers/{timer}', 'ApiTimerController@view')->name('timer.view');
    Route::put('/timers/{timer}', 'ApiTimerController@update')->name('timer.update');
    Route::post('/timers/{timer}/start', 'ApiTimerController@start')->name('timer.start');
    Route::post('/timers/{timer}/stop', 'ApiTimerController@stop')->name('timer.stop');
    Route::post('/timers/{timer}/restart', 'ApiTimerController@start')->name('timer.start');
    Route::post('/timers/{timer}/reset', 'ApiTimerController@reset')->name('timer.reset');
    Route::post('/timers/{timer}/pause', 'ApiTimerController@pause')->name('timer.pause');
    Route::post('/timers/{timer}/resume', 'ApiTimerController@resume')->name('timer.resume');
    Route::delete('/timers/{timer}', 'ApiTimerController@delete')->name('timer.delete');

    // TRIGGERS

    // Authenticated Routes
    Route::get('/timers/{timer}/triggers', 'ApiTriggerController@index')->name('trigger.index');
    Route::post('/timers/{timer}/triggers', 'ApiTriggerController@create')->name('trigger.create');

    Route::get('/triggers/{trigger}', 'ApiTriggerController@view')->name('trigger.view');
    Route::put('/triggers/{trigger}', 'ApiTriggerController@update')->name('trigger.update');
    Route::delete('/triggers/{trigger}', 'ApiTriggerController@delete')->name('trigger.delete');

});
