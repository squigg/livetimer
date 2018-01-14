<?php namespace App\Http\Responses;

use App\Trigger;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Collection;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 05/12/17
 * Time: 22:48
 */
class TriggerResponse implements Responsable
{

    /**
     * @var Trigger|Collection
     */
    protected $trigger;

    public function __construct($trigger)
    {
        $this->trigger = $trigger;
    }

    public function toResponse($request)
    {
        if ($this->trigger instanceof Collection) {
            $data = $this->trigger->map(function ($trigger) {
                return $this->transformTrigger($trigger);
            });
        } else {
            $data = $this->transformTrigger($this->trigger);
        }
        return response()->json($data);
    }

    protected function transformTrigger(Trigger $trigger)
    {
        $data = $trigger->toArray();
        $data['id'] = $trigger->uuid;
        return $data;
    }

}
