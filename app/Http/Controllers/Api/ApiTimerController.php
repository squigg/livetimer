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
        //        $user = $guard->user();
        //        $timers = $user->timers;
        $timers = Timer::all();
        return new TimerResponse($timers);
    }

    public function view(Timer $timer)
    {
        if ($timer->status === Timer::STATUS_STARTED && $timer->finish_at->lt(Carbon::now())) {
            return $this->complete($timer);
        }
        if ($timer->status === Timer::STATUS_STARTED) {
            $timer->remaining = $timer->finish_at->diffInSeconds();
        }
        return new TimerResponse($timer);
    }

    public function create(Request $request)
    {
        $validatedData = $this->validate($request, [
            'name'     => 'required|string',
            'duration' => 'sometimes|required|numeric',
        ]);
        $timer = new Timer($validatedData);
        $timer->user_id = 1;
        $timer->duration = 30;

        return $this->reset($timer);
    }

    public function update(Timer $timer, Request $request)
    {
        $duration = $timer->duration;
        $validatedData = $this->validate($request, [
            'name'     => 'sometimes|required|string',
            'duration' => 'sometimes|required|numeric',
        ]);
        $timer->fill($validatedData);
        if ($timer->duration !== $duration) {
            return $this->reset($timer);
        }
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

    public function complete(Timer $timer)
    {
        $timer->status = Timer::STATUS_COMPLETE;
        $timer->remaining = 0;
        $timer->started_at = null;
        $timer->finish_at = null;
        $timer->save();
        return new TimerResponse($timer);
    }

    public function stop(Timer $timer, Request $request)
    {
        $validatedData = $this->validate($request, [
            'remaining' => 'required|numeric|max:' . $timer->duration
        ]);
        $timer->status = Timer::STATUS_STOPPED;
        $timer->finish_at = null;
        $timer->remaining = $validatedData['remaining'];
        $timer->save();
        return new TimerResponse($timer);
    }

    public function pause(Timer $timer, Request $request)
    {
        $validatedData = $this->validate($request, [
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
