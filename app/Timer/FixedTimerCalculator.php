<?php namespace App\Timer;

use App\Timer;
use Carbon\Carbon;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 30/01/18
 * Time: 18:27
 */
class FixedTimerCalculator extends BaseTimerCalculator
{

    public function start()
    {
        $this->timer->status = Timer::STATUS_STARTED;
        $this->timer->remaining = $this->timer->duration;
        $this->timer->started_at = Carbon::now();
        $this->timer->finish_at = Carbon::now()->addSeconds($this->timer->duration);
    }

    public function reset()
    {
        $this->timer->status = Timer::STATUS_STOPPED;
        $this->timer->remaining = $this->timer->duration;
        $this->timer->started_at = null;
        $this->timer->finish_at = null;
    }

    public function complete()
    {
        $this->timer->status = Timer::STATUS_COMPLETE;
        $this->timer->remaining = 0;
        $this->timer->started_at = null;
        $this->timer->finish_at = null;
    }

    public function stop(int $remaining = null)
    {
        $this->timer->status = Timer::STATUS_STOPPED;
        $this->timer->finish_at = null;
        $this->timer->remaining = $remaining;
    }

    public function pause(int $remaining = null)
    {
        $this->timer->status = Timer::STATUS_PAUSED;
        $this->timer->finish_at = null;
        $this->timer->remaining = $remaining;
    }

    public function resume()
    {
        $this->timer->status = Timer::STATUS_STARTED;
        $this->timer->finish_at = Carbon::now()->addSeconds($this->timer->remaining);
    }

}
