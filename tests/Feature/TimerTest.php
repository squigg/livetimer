<?php

namespace Tests\Feature;

use App\Timer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class TimerTest extends TestCase
{

    use RefreshDatabase;
    /**
     * @var Carbon
     */
    protected $fakeNow;

    /**
     * @var Timer
     */
    protected $timer;
    protected $timerUrl;

    public function setUp()
    {
        parent::setUp();
        $this->fakeNow = Carbon::create(2017, 1, 1, 13, 0, 0);
        Carbon::setTestNow($this->fakeNow);
        $this->timer = factory(Timer::class)->create(['user_id' => 1]);
        $this->timerUrl = '/api/timers/' . $this->timer->uuid;
    }

    /** @test */
    public function it_can_get_a_timer()
    {
        $response = $this->json('get', $this->timerUrl);
        $response->assertStatus(200)->assertJson([
            'name'       => $this->timer->name,
            'id'         => $this->timer->uuid,
            'duration'   => $this->timer->duration,
            'started_at' => $this->timer->started_at,
            'finish_at'  => $this->timer->finish_at,
            'remaining'  => $this->timer->remaining,
            'status'     => $this->timer->status,
        ]);
    }

    /** @test */
    public function it_can_update_a_timer()
    {
        $data = ['name' => 'My New Timer', 'duration' => 550];
        $response = $this->json('put', $this->timerUrl, $data);
        $response->assertStatus(200)->assertJson([
            'name'     => 'My New Timer',
            'duration' => 550,
        ]);
    }

    /** @test */
    public function it_can_start_a_timer()
    {
        $data = ['name' => 'My New Timer', 'duration' => 550];

        $response = $this->json('post', $this->timerUrl . '/start', $data);
        $response->assertStatus(200)->assertJson([
            'name'      => $this->timer->name,
            'status'    => Timer::STATUS_STARTED,
            'duration'  => (string)$this->timer->duration,
            'remaining' => (string)$this->timer->duration,
            'finish_at' => $this->fakeNow->addSeconds($this->timer->duration)->toIso8601String(),
        ]);
    }

    /** @test */
    public function it_can_pause_a_timer()
    {
        $data = ['remaining' => $this->timer->duration - 30];

        $response = $this->json('post', $this->timerUrl . '/pause', $data);
        $response->assertStatus(200)->assertJson([
            'name'      => $this->timer->name,
            'status'    => Timer::STATUS_PAUSED,
            'duration'  => (string)$this->timer->duration,
            'remaining' => $data['remaining'],
            'finish_at' => null,
        ]);
    }

    /** @test */
    public function it_fails_if_remaining_greater_than_duration_on_pause()
    {
        $data = ['remaining' => $this->timer->duration + 10];

        $response = $this->json('post', $this->timerUrl . '/pause', $data);
        $response->assertStatus(422);
    }
}
