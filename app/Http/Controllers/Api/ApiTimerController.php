<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\TimerResponse;
use App\Timer;
use App\User;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ApiTimerController extends Controller
{

    public function index(Guard $guard)
    {
        /** @var User $user */
        $user = $guard->user();
        $timers = $user->timers;
        return new TimerResponse($timers);
    }

    public function view(Timer $timer)
    {
        return new TimerResponse($timer);
    }

    public function update(Timer $timer, Request $request)
    {
        $validatedData = $request->validate([
            'name'     => 'sometimes|required|string',
            'duration' => 'sometimes|required|numeric',
        ]);
        $timer->fill($validatedData);
        $timer->save();
        return new TimerResponse($timer);
    }

    public function start(Timer $timer)
    {
        $timer->status = Timer::STATUS_STARTED;
        $timer->remaining = $timer->duration;
        $timer->started_at = Carbon::now();
        $timer->finish_at = Carbon::now()->addSeconds($timer->duration);
        $timer->save();
        return new TimerResponse($timer);
    }

    public function reset(Timer $timer)
    {
        $timer->status = Timer::STATUS_STOPPED;
        $timer->remaining = $timer->duration;
        $timer->started_at = null;
        $timer->finish_at = null;
        $timer->save();
        return new TimerResponse($timer);
    }

    public function pause(Timer $timer, Request $request)
    {
        $validatedData = $request->validate([
            'remaining' => 'required|numeric|max:' . $timer->duration
        ]);
        $timer->status = Timer::STATUS_PAUSED;
        $timer->finish_at = null;
        $timer->remaining = $validatedData['remaining'];
        $timer->save();
        return new TimerResponse($timer);
    }

    public function resume(Timer $timer)
    {
        $timer->status = Timer::STATUS_STARTED;
        $timer->finish_at = Carbon::now()->addSeconds($timer->remaining);
        $timer->save();
        return new TimerResponse($timer);
    }

    public function delete(Timer $timer)
    {
        /** @noinspection PhpUnhandledExceptionInspection */
        $timer->delete();
        return response(null, 200);
    }

}
