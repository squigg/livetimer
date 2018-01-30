<?php namespace App\Timer;

use App\Timer;
use Carbon\Carbon;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 30/01/18
 * Time: 18:27
 */
class CountdownTimerCalculator extends BaseTimerCalculator
{

    protected function calculateRemaining()
    {
        return Carbon::now()->diffInSeconds($this->timer->finish_at);
    }

    public function start()
    {
        $this->timer->status = Timer::STATUS_STARTED;
        $this->timer->started_at = Carbon::now();
        $this->timer->remaining = $this->calculateRemaining();
    }

    public function reset()
    {
        $this->timer->status = Timer::STATUS_STARTED;
        $this->timer->remaining = $this->calculateRemaining();
        $this->timer->started_at = null;
    }

    public function complete()
    {
        $this->timer->status = Timer::STATUS_COMPLETE;
        $this->timer->remaining = 0;
        $this->timer->started_at = null;
    }

    public function stop(int $remaining = null)
    {
        $this->timer->status = Timer::STATUS_STOPPED;
        $this->timer->remaining = $this->calculateRemaining();
    }

    public function pause(int $remaining = null)
    {
        $this->timer->status = Timer::STATUS_PAUSED;
        $this->timer->remaining = $this->calculateRemaining();
    }

    public function resume()
    {
        $this->timer->status = Timer::STATUS_STARTED;
        $this->timer->remaining = $this->calculateRemaining();
    }

}
