<?php

use App\Timer;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 1)->create()->each(function ($u) {
            $u->timers()->save(factory(Timer::class)->make());
        });

    }
}
