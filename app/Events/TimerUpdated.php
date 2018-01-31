<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TimerUpdated implements ShouldBroadcastNow
{

    use Dispatchable, InteractsWithSockets, SerializesModels;
    /**
     * @var array
     */
    public $timer;

    /**
     * Create a new event instance.
     *
     * @param array $timerData
     */
    public function __construct($timerData)
    {
        $this->timer = $timerData;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('App.Timer.' . $this->timer['id']);
    }

}
