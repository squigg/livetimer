<?php

use App\Http\Controllers\TimerController;
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

    Route::get('/timers', TimerController::class . '@index');
    Route::get('/timers/{id}', TimerController::class . '@view');
    Route::post('/timers', TimerController::class . '@create');
    Route::put('/timers/{id}', TimerController::class . '@update');
    Route::post('/timers/{id}/set/{duration}', TimerController::class . '@setTime');
    Route::post('/timers/{id}/start', TimerController::class . '@start');
    Route::post('/timers/{id}/restart', TimerController::class . '@restart');
    Route::post('/timers/{id}/reset', TimerController::class . '@reset');
    Route::post('/timers/{id}/pause', TimerController::class . '@pause');
    Route::delete('/timers/{id}', TimerController::class . '@delete');

});




