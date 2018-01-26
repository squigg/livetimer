<?php

use App\Timer;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Timer::class, function (Faker $faker) {
    return [
        'name'      => 'Timer ' . $faker->unique()->randomDigitNotNull,
        'status'    => Timer::STATUS_STOPPED,
        'duration'  => 35,
        'remaining' => 35,
        'user_id'   => 1,
    ];
});
