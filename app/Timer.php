<?php

namespace App;

use App\Timer\BaseTimerCalculator;
use App\Timer\TimerCalculator;
use Carbon\Carbon;
use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * @property string name
 * @property string status
 * @property int duration
 * @property Carbon finish_at
 * @property int remaining
 * @property Carbon started_at
 * @property string uuid
 * @property int id
 * @property Collection triggers
 * @property int user_id
 * @property string type
 */
class Timer extends Model
{

    use Uuids;

    const STATUS_STARTED = 'started';
    const STATUS_STOPPED = 'stopped';
    const STATUS_PAUSED = 'paused';
    const STATUS_COMPLETE = 'complete';

    const TYPE_COUNTDOWN = 'countdown';
    const TYPE_FIXED = 'fixed';

    protected $fillable = ['name', 'duration', 'finish_at'];
    protected $hidden = ['uuid'];
    protected $dates = ['finish_at', 'started_at'];

    /**
     * @var BaseTimerCalculator
     */
    protected $calc;

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function triggers()
    {
        return $this->hasMany(Trigger::class);
    }

    /**
     * @return TimerCalculator
     */
    public function calculate()
    {
        return $this->getCalculator();
    }

    /**
     * @return TimerCalculator
     */
    protected function getCalculator()
    {
        if ($this->calc) {
            return $this->calc;
        }

        $type = Str::studly($this->type);
        $class = '\\App\\Timer\\' . $type . 'TimerCalculator';

        if (!class_exists($class)) {
            throw new \InvalidArgumentException('Invalid Timer type: ' . $type);
        }

        $calc = new $class($this);

        return $this->calc = $calc;
    }

    protected function getDateFormat()
    {
        return \DateTime::ATOM;
    }

}
