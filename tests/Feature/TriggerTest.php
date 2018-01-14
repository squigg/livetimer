<?php

namespace Tests\Feature;

use App\Timer;
use App\Trigger;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class TriggerTest extends TestCase
{

    use RefreshDatabase;
    /**
     * @var Carbon
     */
    protected $fakeNow;

    /**
     * @var Trigger
     */
    protected $trigger;
    protected $triggerUrl;
    /**
     * @var Timer
     */
    protected $timer;

    public function setUp()
    {
        parent::setUp();
        $this->fakeNow = Carbon::create(2017, 1, 1, 13, 0, 0);
        Carbon::setTestNow($this->fakeNow);
        $this->timer = factory(Timer::class)->create(['user_id' => 1]);
        $this->trigger = factory(Trigger::class)->create(['timer_id' => 1]);
        $this->triggerUrl = '/api/triggers/' . $this->trigger->uuid;
    }

    /** @test */
    public function it_can_get_a_trigger()
    {
        $response = $this->json('get', $this->triggerUrl);
        $response->assertStatus(200)->assertJson([
            'name'             => $this->trigger->name,
            'id'               => $this->trigger->uuid,
            'target_time'      => $this->trigger->target_time,
            'compare_type'     => $this->trigger->compare_type,
            'action'           => $this->trigger->action,
            'action_parameter' => $this->trigger->action_parameter,
            'enabled'          => $this->trigger->enabled,
        ]);
    }

    /** @test */
    public function it_can_get_trigger_index_for_a_timer()
    {
        $url = '/api/timers/' . $this->timer->uuid . '/triggers';
        $response = $this->json('get', $url);
        $response->assertStatus(200)->assertJson([
            [
                'name'             => $this->trigger->name,
                'id'               => $this->trigger->uuid,
                'target_time'      => $this->trigger->target_time,
                'compare_type'     => $this->trigger->compare_type,
                'action'           => $this->trigger->action,
                'action_parameter' => $this->trigger->action_parameter,
                'enabled'          => $this->trigger->enabled,
            ]
        ]);
    }

    /** @test */
    public function it_can_update_a_trigger()
    {
        $data = ['name' => 'My New Trigger', 'target_time' => 60];
        $response = $this->json('put', $this->triggerUrl, $data);
        $response->assertStatus(200)->assertJsonFragment([
            'name'        => 'My New Trigger',
            'target_time' => 60,
        ]);
    }

}
