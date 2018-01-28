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

    public function create(Timer $timer, Request $request)
    {
        $validatedData = $this->validateTrigger($request);

        $trigger = new Trigger($validatedData);
        $trigger->timer()->associate($timer);
        $trigger->save();

        return new TriggerResponse($trigger);
    }

    public function update(Trigger $trigger, Request $request)
    {
        $validatedData = $this->validateTrigger($request);

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

    protected function validateTrigger(Request $request)
    {
        return $this->validate($request, [
            'name'              => 'required|string',
            'target_time'       => 'required|numeric',
            'action_type'       => 'required|string',
            'action_parameters' => 'sometimes|required|array',
            'compare_type'      => 'required|string',
        ]);
    }

}
