<?php

namespace App;

use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string uuid
 * @property string name
 * @property integer target_time
 * @property string compare_type
 * @property string action
 * @property string action_parameter
 * @property boolean enabled
 */
class Trigger extends Model
{

    use Uuids;

    const COMPARE_EXACTLY = 'exactly';
    const COMPARE_LESS_THAN = 'less_than';
    const COMPARE_GREATER_THAN = 'greater_than';

    const ACTION_PLAY_SOUND = 'play_sound';
    const ACTION_CHANGE_BG_COLOR = 'change_bg_color';
    const ACTION_CHANGE_FG_COLOR = 'change_fg_color';

    protected $hidden = ['uuid'];
    protected $fillable = ['name', 'target_time', 'compare_type', 'action', 'action_parameter'];
    protected $casts = ['enabled' => 'boolean'];

    public function timer()
    {
        return $this->belongsTo(Timer::class);
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
