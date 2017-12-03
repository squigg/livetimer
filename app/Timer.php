<?php

namespace App;

use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{

    use Uuids;

    public function user()
    {
        return $this->hasOne(User::class);
    }

}
