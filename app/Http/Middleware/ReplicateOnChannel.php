<?php

namespace App\Http\Middleware;

use App\Events\TimerUpdated;
use App\Events\TriggerUpdated;
use App\Http\Responses\TimerResponse;
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

        if ($request->method() !== 'GET' && $response->status() === 200) {

            if ($request->routeIs('timer.*')) {
                $this->replicateTimer($request);
            }

            if ($request->routeIs('trigger.*') || $request->routeIs('timer.template')) {
                $this->replicateTrigger($request);
            }
        }

        return $response;
    }

    protected function replicateTimer(Request $request)
    {
        $timer = $this->getTimer($request);

        if (!$timer) {
            return;
        }

        $timerData = (new TimerResponse($timer))->transform();
        event(new TimerUpdated($timerData));
    }

    protected function replicateTrigger(Request $request)
    {
        if (!$timer = $this->getTimer($request)) {
            $timer = $request->route()->parameter('trigger')->timer;
        }
        $triggerData = (new TriggerResponse($timer->triggers))->transform()->toArray();
        event(new TriggerUpdated($timer->uuid, $triggerData));
    }

    protected function getTimer(Request $request)
    {
        return $request->route()->parameter('timer');
    }
}
