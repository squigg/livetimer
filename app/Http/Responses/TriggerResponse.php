<?php namespace App\Http\Responses;

use App\Trigger;
use Illuminate\Contracts\Support\Responsable;

/**
 * Created by PhpStorm.
 * User: squigg
 * Date: 05/12/17
 * Time: 22:48
 */
class TriggerResponse extends BaseResponse implements Responsable
{

    /**
     * @param Trigger $trigger
     * @return mixed
     */
    protected function transformOne($trigger)
    {
        $data = $trigger->toArray();
        $data['id'] = $trigger->uuid;
        return $data;
    }

}
