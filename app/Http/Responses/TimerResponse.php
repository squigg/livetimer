<?php namespace App\Http\Responses;

use App\Timer;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Collection;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 05/12/17
 * Time: 22:48
 */
class TimerResponse implements Responsable
{

    /**
     * @var Timer|Collection
     */
    protected $timer;

    public function __construct($timer)
    {
        $this->timer = $timer;
    }

    public function toResponse($request)
    {
        if ($this->timer instanceof Collection) {
            $data = $this->timer->map(function ($timer) {
                return $this->transformTimer($timer);
            });
        } else {
            $data = $this->transformTimer($this->timer);
        }
        return response()->json($data);
    }

    protected function transformTimer(Timer $timer)
    {
        $data = $timer->toArray();
        $data['id'] = $timer->uuid;
        $data['finish_at'] = $timer->finish_at ? $timer->finish_at->toIso8601String() : null;
        $data['started_at'] = $timer->started_at ? $timer->started_at->toIso8601String() : null;
        return $data;
    }

}
