<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TriggerUpdated implements ShouldBroadcastNow
{

    use Dispatchable, InteractsWithSockets, SerializesModels;
    /**
     * @var array
     */
    public $triggers;

    /**
     * @var string
     */
    protected $timerId;

    /**
     * Create a new event instance.
     *
     * @param string $timerId
     * @param array $triggers
     */
    public function __construct($timerId, $triggers)
    {
        $this->timerId = $timerId;
        $this->triggers = $triggers;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('App.Timer.' . $this->timerId);
    }

}
