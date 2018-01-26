<?php

namespace App;

use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string uuid
 * @property string name
 * @property integer target_time
 * @property string compare_type
 * @property string action_type
 * @property string action_parameters
 * @property boolean enabled
 * @property integer timer_id
 */
class Trigger extends Model
{

    use Uuids;

    const COMPARE_EXACTLY = 'exactly';
    const COMPARE_LESS_THAN = 'less_than';
    const COMPARE_GREATER_THAN = 'greater_than';

    const ACTION_PLAY_SOUND = 'play_sound';
    const ACTION_CHANGE_STYLE = 'change_style';

    protected $hidden = ['uuid'];
    protected $fillable = ['name', 'target_time', 'compare_type', 'action_type', 'action_parameters'];
    protected $casts = ['enabled' => 'boolean', 'action_parameters' => 'array'];

    public function timer()
    {
        return $this->belongsTo(Timer::class);
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
