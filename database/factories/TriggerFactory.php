<?php

use App\Trigger;
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

$factory->define(App\Trigger::class, function (Faker $faker) {
    return [
        'name'             => $faker->name,
        'enabled'          => true,
        'target_time'      => 30,
        'compare_type'     => Trigger::COMPARE_EXACTLY,
        'action'           => Trigger::ACTION_CHANGE_BG_COLOR,
        'action_parameter' => 'woop_woop',
    ];
});

$factory->state(App\Trigger::class, 'sound', [
    'action'           => Trigger::ACTION_PLAY_SOUND,
    'action_parameter' => 'woop_woop',
]);

$factory->state(App\Trigger::class, 'bg_color', [
    'action'           => Trigger::ACTION_CHANGE_BG_COLOR,
    'action_parameter' => 'red',
]);
