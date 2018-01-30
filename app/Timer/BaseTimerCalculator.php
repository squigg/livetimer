<?php namespace App\Timer;

use App\Timer;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 30/01/18
 * Time: 18:27
 */
abstract class BaseTimerCalculator implements TimerCalculator
{

    /**
     * @var Timer
     */
    protected $timer;

    /**
     * BaseTimerCalculator constructor.
     * @param Timer $timer
     */
    public function __construct(Timer $timer)
    {
        $this->timer = $timer;
    }

    public abstract function start();

    public abstract function reset();

    public abstract function complete();

    public abstract function stop(int $remaining = null);

    public abstract function pause(int $remaining = null);

    public abstract function resume();

}
