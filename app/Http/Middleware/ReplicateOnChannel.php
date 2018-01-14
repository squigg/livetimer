<?php

namespace App\Http\Middleware;

use App\Events\TimerUpdated;
use App\Events\TriggerUpdated;
use App\Http\Responses\TriggerResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReplicateOnChannel
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /** @var Response $response */
        $response = $next($request);

        if ($request->method() !== 'GET') {

            if ($request->routeIs('timer.*')) {
                $this->replicateTimer($response->content());
            }

            if ($request->routeIs('trigger.*')) {
                $this->replicateTrigger($request);
            }
        }

        return $response;
    }

    protected function replicateTimer($timerData)
    {
        event(new TimerUpdated(json_decode($timerData, true)));
    }

    protected function replicateTrigger(Request $request)
    {
        $timer = $request->route()->parameter('timer');
        if (!$timer) {
            $timer = $request->route()->parameter('trigger')->timer;
        }
        $triggerData = (new TriggerResponse($timer->triggers))->transform()->toArray();
        event(new TriggerUpdated($timer->uuid, $triggerData));
    }
}
