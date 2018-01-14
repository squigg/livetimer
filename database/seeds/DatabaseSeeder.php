<?php

use App\Timer;
use App\Trigger;
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
            $u->timers()->save(factory(Timer::class)->create(['uuid' => '5E5CD18E-1DB5-460F-B3D8-99C6BDFB3747']));
        });

        $timer = Timer::all()->first();
        factory(Trigger::class)->create(['timer_id' => $timer->id]);

    }
}
