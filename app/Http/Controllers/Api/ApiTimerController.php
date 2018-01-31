<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\TimerResponse;
use App\Timer;
use App\Trigger;
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
        $timer->type = Timer::TYPE_FIXED;

        return $this->reset($timer);
    }

    public function update(Timer $timer, Request $request)
    {
        $validatedData = $this->validate($request, [
            'name'      => 'sometimes|required|string',
            'duration'  => 'sometimes|required|numeric',
            'finish_at' => 'sometimes|required|date_format:' . \DateTime::ATOM,
        ]);

        $timer->fill($validatedData);

        if ($timer->isDirty('duration')) {
            $timer->type = Timer::TYPE_FIXED;
            $timer->finish_at = null;
            return $this->reset($timer);
        }

        if ($timer->isDirty('finish_at')) {
            $timer->type = Timer::TYPE_COUNTDOWN;
            $timer->duration = 0;
            return $this->reset($timer);
        }

        $timer->save();
        return new TimerResponse($timer);
    }

    public function start(Timer $timer)
    {
        $timer->calculate()->start();
        $timer->save();
        return new TimerResponse($timer);
    }

    public function reset(Timer $timer)
    {
        $timer->calculate()->reset();
        $timer->save();
        return new TimerResponse($timer);
    }

    public function complete(Timer $timer)
    {
        $timer->calculate()->complete();
        $timer->save();
        return new TimerResponse($timer);
    }

    public function stop(Timer $timer, Request $request)
    {
        $validatedData = $this->validate($request, [
            'remaining' => 'required|numeric|max:' . $timer->duration
        ]);
        $timer->calculate()->stop($validatedData['remaining']);
        $timer->save();
        return new TimerResponse($timer);
    }

    public function pause(Timer $timer, Request $request)
    {
        $validatedData = $this->validate($request, [
            'remaining' => 'required|numeric|max:' . $timer->duration
        ]);
        $timer->calculate()->pause($validatedData['remaining']);
        $timer->save();
        return new TimerResponse($timer);
    }

    public function resume(Timer $timer)
    {
        $timer->calculate()->resume();
        $timer->save();
        return new TimerResponse($timer);
    }

    public function delete(Timer $timer)
    {
        /** @noinspection PhpUnhandledExceptionInspection */
        $timer->delete();
        return response(null, 200);
    }

    public function template(Timer $timer, Request $request)
    {
        $validatedData = $this->validate($request, [
            'template' => 'required|string|exists:timers,uuid'
        ]);

        $template = Timer::Uuid($validatedData['template']);
        $data = collect($template->toArray())->only(['duration', 'finish_at', 'type'])->toArray();
        $timer->fill($data);
        $timer->save();

        $this->copyTriggers($template, $timer);

        return $this->reset($timer);
    }

    protected function copyTriggers(Timer $source, Timer $dest)
    {
        $triggers = $source->triggers;
        $dest->triggers()->delete();
        $triggers->each(function (Trigger $trigger) use ($dest) {
            $dest->triggers()->save($trigger->replicate());
        });
        return $dest;
    }
}
