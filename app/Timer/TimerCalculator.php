<?php
/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 30/01/18
 * Time: 18:37
 */

namespace App\Timer;


/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 30/01/18
 * Time: 18:27
 */
interface TimerCalculator
{

    public function start();

    public function reset();

    public function complete();

    public function stop(int $remaining = null);

    public function pause(int $remaining = null);

    public function resume();
}
