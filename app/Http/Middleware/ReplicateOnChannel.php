<?php

namespace App\Http\Middleware;

use App\Events\TimerUpdated;
use Closure;
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

            $timerData = $response->content();
            event(new TimerUpdated(json_decode($timerData, true)));
        }

        return $response;
    }
}
