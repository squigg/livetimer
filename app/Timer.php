<?php

namespace App;

use Carbon\Carbon;
use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

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
 */
class Timer extends Model
{

    use Uuids;

    const STATUS_STARTED = 'started';
    const STATUS_STOPPED = 'stopped';
    const STATUS_PAUSED = 'paused';
    const STATUS_COMPLETE = 'complete';

    protected $fillable = ['name', 'duration'];
    protected $hidden = ['uuid'];
    protected $dates = ['finish_at', 'started_at'];

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

}
