<?php namespace App\Http\Responses;

use App\Timer;
use Illuminate\Contracts\Support\Responsable;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 05/12/17
 * Time: 22:48
 */
class TimerResponse extends BaseResponse implements Responsable
{

    /**
     * @param Timer $timer
     * @return mixed
     */
    protected function transformOne($timer)
    {
        $data = $timer->toArray();
        $data['id'] = $timer->uuid;
        $data['finish_at'] = $timer->finish_at ? $timer->finish_at->toIso8601String() : null;
        $data['started_at'] = $timer->started_at ? $timer->started_at->toIso8601String() : null;
        return $data;
    }

}
