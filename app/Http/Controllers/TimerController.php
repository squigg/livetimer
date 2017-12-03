<?php

namespace App\Http\Controllers;

use App\Timer;

class TimerController extends Controller
{

    public function index()
    {
        //        $timers = Auth::user()->timers;
        $timers = Timer::all();;
        return view('index')->with('timers', $timers);
    }
}
