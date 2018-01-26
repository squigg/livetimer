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
        'name'              => $faker->name,
        'enabled'           => true,
        'target_time'       => 30,
        'compare_type'      => Trigger::COMPARE_LESS_THAN,
        'action_type'       => Trigger::ACTION_CHANGE_STYLE,
        'action_parameters' => ['property' => 'background-color', 'value' => 'red'],
    ];
});

$factory->state(App\Trigger::class, 'sound', [
    'compare_type'      => Trigger::COMPARE_EXACTLY,
    'action_type'       => Trigger::ACTION_PLAY_SOUND,
    'action_parameters' => ['sound' => 'woop_woop'],
]);

$factory->state(App\Trigger::class, 'sound_complete', [
    'compare_type'      => Trigger::COMPARE_EXACTLY,
    'target_time'       => 0,
    'action_type'       => Trigger::ACTION_PLAY_SOUND,
    'action_parameters' => ['sound' => 'railroad_crossing_bell'],
]);

$factory->state(App\Trigger::class, 'bg_color', [
    'action_type'       => Trigger::ACTION_CHANGE_STYLE,
    'action_parameters' => ['property' => 'background-color', 'value' => 'red'],
]);
