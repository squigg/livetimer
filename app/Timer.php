<?php

namespace App;

use Carbon\Carbon;
use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string name
 * @property string status
 * @property int duration
 * @property Carbon finish_at
 * @property int remaining
 * @property Carbon started_at
 * @property string uuid
 * @property int id
 */
class Timer extends Model
{

    use Uuids;

    const STATUS_STARTED = 'started';
    const STATUS_STOPPED = 'stopped';
    const STATUS_PAUSED = 'paused';

    protected $fillable = ['name', 'duration'];
    protected $hidden = ['uuid'];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }

}
