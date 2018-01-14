<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\TriggerResponse;
use App\Timer;
use App\Trigger;
use App\User;
use Illuminate\Http\Request;

class ApiTriggerController extends Controller
{

    public function index(Timer $timer)
    {
        /** @var User $user */
        $triggers = $timer->triggers;
        return new TriggerResponse($triggers);
    }

    public function view(Trigger $trigger)
    {
        return new TriggerResponse($trigger);
    }

    public function update(Trigger $trigger, Request $request)
    {
        $validatedData = $request->validate([
            'name'             => 'sometimes|required|string',
            'target_time'      => 'sometimes|required|numeric',
            'action'           => 'sometimes|required|string',
            'action_parameter' => 'sometimes|required|string',
            'compare_type'     => 'sometimes|required|string',
        ]);

        $trigger->fill($validatedData);
        $trigger->save();
        return new TriggerResponse($trigger);
    }

    public function delete(Trigger $trigger)
    {
        /** @noinspection PhpUnhandledExceptionInspection */
        $trigger->delete();
        return response(null, 200);
    }

}
